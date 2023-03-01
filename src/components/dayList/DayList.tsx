import { ReactElement, useState } from 'react';
import { DaysHeader, DaysWrapper } from "./DayList.styles";
import { Day } from "../../models/Day";
import { CustomEvent } from "../../models/CustomEvent";
import DayItem from '../dayItem/DayItem';
import { useAppSelector } from '../../state/hooks';
import { isToday } from '../../util';
import { Label } from '../../models/Label';
import { Holiday } from '../../models/Holiday';

type Props = {

    days: Array<Day>
    filterTitle: string,
    filterLabels: Label[],
    holidays: Holiday[]
}
function DayList({ days, filterTitle, filterLabels,holidays }: Props) {


    const { eventList } = useAppSelector(state => state)

    const [draggedDay, setDraggedDay] = useState({})
    const [draggedEvent, setDraggedEvent] = useState({})


    function createDay(day: Day): ReactElement {

        let dayEvents = eventList.filter((e: CustomEvent) => {
            let result = isToday(day.date, e.date)
            if (filterTitle && result) result = e.title.toLowerCase().includes(filterTitle.toLowerCase())
            if (filterLabels.length > 0 && result) result = e.labels.some(evL=>filterLabels.some(fL=>fL.title===evL.title && fL.color === evL.color))
            return result
        })
        day.eventsList = dayEvents



        return (<DayItem
            day={day}
            draggedDay={draggedDay}
            draggedEvent={draggedEvent}
            holiday={ 
                holidays.find((h:Holiday)=>{
                    return isToday(day.date, new Date(h.date))
                })
            }
            setDraggedDay={(d: Day) => { setDraggedDay(day) }}
            setDraggedEvent={(e: CustomEvent) => { setDraggedEvent(e) }}
        />)
    }

    function createLine(days: Array<Day>): ReactElement {
        return (
            <div className="line" >
                {days.map(d => createDay(d))}
            </div>)
    }

    let chunks = []
    const chunkSize = 7;
    for (let i = 0; i < days.length; i += chunkSize) {
        const chunk = days.slice(i, i + chunkSize);
        chunks.push(chunk);
    }

    return (
        <div id="calendar" style={{ width: "100%" }}>
            <DaysHeader>
                <div className="item">Sun</div>
                <div className="item">Mon</div>
                <div className="item">Tue</div>
                <div className="item">Wed</div>
                <div className="item">Thu</div>
                <div className="item">Fri</div>
                <div className="item">Sat</div>
            </DaysHeader>
            <DaysWrapper>
                {chunks.map(c => createLine(c))}
            </DaysWrapper>
        </div>
    );
}

export default DayList;
