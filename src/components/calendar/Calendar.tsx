import { useState, useEffect } from 'react';
import { CalendarWrapper } from "./Calendar.styles";
import { Month } from "../../models/Month";
import { getHolidaysForYear } from '../../date';
import DayList from "../dayList/DayList";
import CalendarControls from "../calendarControls/CalendarControls";
import { Label } from '../../models/Label';
import { Holiday } from '../../models/Holiday';



function Calendar() {
    const [month, setMonth] = useState(new Month(new Date()))
    const [filterTitle, setFilterTitle] = useState('')
    const [filterLabels, setFilterLabels] = useState(new Array<Label>())
    const [yearHolidays, setYearHolidays] = useState({
        year: -1,
        holidays: new Array<Holiday>()
    })

    useEffect(() => {
        let monthYear = month.date.getFullYear()
        if (monthYear !== yearHolidays.year || yearHolidays.holidays.length === 0) {
            getHolidaysForYear(monthYear).then((holidays) => {

                setYearHolidays((prev) => {
                    return {
                        ...prev,
                        year: monthYear,
                        holidays
                    }
                })
            })
        }
    }, [month])

    function changeMonth(date: Date): void {
        setMonth(new Month(date));
    }


    return (
        <CalendarWrapper>
            <CalendarControls
                title={month.title}
                changeMonth={changeMonth}
                month={month}
                filterTitle={filterTitle}
                setFilterTitle={(s: string) => { setFilterTitle(s) }}
                filterLabels={filterLabels}
                setFilterLabels={(labels: Label[]) => { setFilterLabels(labels) }}
            />
            <DayList days={month.days} filterTitle={filterTitle} holidays={yearHolidays.holidays} filterLabels={filterLabels} />
        </CalendarWrapper>
    );
}

export default Calendar;
