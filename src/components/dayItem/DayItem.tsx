import React, { useEffect, useState } from 'react';
import { DayWrapper,AddEvent,DateCont } from './DayItem.styles'
import { Day } from "../../models/Day";
import { CustomEvent } from "../../models/CustomEvent";
import EventList from '../eventList/EventList';
import { addEventAction, changeEventAction } from '../../state/reducers/eventReducer';

import { useAppDispatch } from '../../state/hooks';
import { Holiday } from '../../models/Holiday';

type Props = {
    day: Day
    holiday?: Holiday
    draggedDay?:unknown,
    draggedEvent?:unknown,
    setDraggedDay: (d:Day)=>void,
    setDraggedEvent: (e:CustomEvent)=>void
}



function DayItem({ day,draggedDay,draggedEvent,setDraggedDay,setDraggedEvent,holiday }: Props) {

    const [open, setOpen] = useState(false)
    const [eventText, setEventText] = useState('')
    

    const dispatch = useAppDispatch()


    function handleClick() {
        setOpen(!open);
    }

    function handleInputClick(e: React.FormEvent<HTMLInputElement>) {
        e.stopPropagation()
    }

    function eventTextChange(e: React.FormEvent<HTMLInputElement>) {
        e.stopPropagation()
        setEventText(e.currentTarget.value)
    }

    function handleAddClick() {
        let event = new CustomEvent(eventText, day.date, 1)
        dispatch(addEventAction(event))
    }

    function dragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        console.log("DRAGGED", draggedEvent);
        if (e.target instanceof HTMLElement) {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }
    function drop(e: React.DragEvent<HTMLDivElement>, dayParam: Day) {
        e.preventDefault()
        console.log("EVENTS", draggedEvent);
        if (day instanceof Day && draggedEvent instanceof CustomEvent) {
            dayParam.eventsList.push(draggedEvent)


            for (let i = 0; i < dayParam.eventsList.length; i++) {
                dispatch(changeEventAction({
                    id: day.eventsList[i].id,
                    event: new CustomEvent(dayParam.eventsList[i].title, dayParam.date, i,draggedEvent.labels)
                }))
            }
        }

    }

    useEffect(()=>{
        console.log("DRAGGED EVENT",draggedEvent)
    },[draggedDay,draggedEvent])

    day.eventsList.sort((a, b) => {
        if (a.order > b.order) return 1
        else return -1
    })
    
    return (
        <>
            <DayWrapper active={day.active} today={day.isToday} onClick={handleClick}
                onDragOver={day.eventsList.length > 0 ? undefined : (e: React.DragEvent<HTMLDivElement>) => { dragOver(e); }}
                onDrop={day.eventsList.length > 0 ? undefined : (e: React.DragEvent<HTMLDivElement>) => { drop(e, day); }} >
                <DateCont className={day.isToday ? "date today" : "date"}>{day.date.getDate()}  </DateCont>
                <EventList
                    events={day.eventsList}
                    day={day}
                    holiday={holiday}
                    draggedDay={draggedDay}
                    setDraggedDay={(dayP: Day) => {
                         setDraggedDay(dayP)
                         console.log("DRAGGED DAY", dayP); 
                    }}
                    draggedEvent={draggedEvent}
                    setDraggedEvent={(evP: CustomEvent) => {
                        setDraggedEvent(evP)
                        console.log("DRAGGED EVENT", evP);
                    }}
                />
                <AddEvent className={open ? "" : "hidden"}>
                    <input onClick={handleInputClick} value={eventText} onChange={eventTextChange} />
                    <button onClick={handleAddClick}>ADD</button>
                </AddEvent>
            </DayWrapper>
        </>
    );
}

export default DayItem;
