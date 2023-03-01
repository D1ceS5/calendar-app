import React, { ReactElement, useState } from 'react';
import { CustomEvent } from "../../models/CustomEvent";
import { EventData, EventWrapper, CreateLabel, LabelInputs, AddLabelButton,HolidayWrapper } from "./EventList.styles";
import { Day } from '../../models/Day';
import { useAppDispatch } from '../../state/hooks';
import { changeEventAction, removeEventAction } from '../../state/reducers/eventReducer';
import addIcon from '../../images/add.svg';
import deleteIcon from '../../images/x-mark.svg';
import { Label } from '../../models/Label';
import { getContrastColor, rgbToHex } from '../../util'
import { Holiday } from '../../models/Holiday';

type Props = {
    events: Array<CustomEvent>,
    day: Day,
    holiday?: Holiday
    setDraggedDay: (day: Day) => void,
    setDraggedEvent: (event: CustomEvent) => void,
    draggedDay?: unknown
    draggedEvent?: unknown
}
function EventList({ events, day, draggedDay, setDraggedDay, draggedEvent, setDraggedEvent, holiday }: Props) {


    const [addLabelID, setAddLabelID] = useState('')
    const [labelText, setLabelText] = useState('')
    const [labelColor, setLabelColor] = useState('#000000')


    const dispatch = useAppDispatch()

    function dragStart(e: React.DragEvent<HTMLDivElement>, day: Day, event: CustomEvent): void {
        setDraggedDay(day)
        setDraggedEvent(event)
    }
    function dragLeave(e: React.DragEvent<HTMLDivElement>) {
        if (e.target instanceof HTMLElement) {
            e.target.style.boxShadow = 'none'
        }
    }
    function dragEnd(e: React.DragEvent<HTMLDivElement>) {
        if (e.target instanceof HTMLElement) {
            e.target.style.boxShadow = 'none'
        }
    }
    function dragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        if (e.target instanceof HTMLElement) {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }
    function drop(e: React.DragEvent<HTMLDivElement>, day: Day, event?: CustomEvent) {
        e.preventDefault()
        if (draggedEvent instanceof CustomEvent && draggedDay instanceof Day) {
            const currentEventIndex = draggedDay.eventsList.indexOf(draggedEvent)
            draggedDay.eventsList.splice(currentEventIndex, 1)

            if (event) {
                const dropIndex = day.eventsList.indexOf(event)
                day.eventsList.splice(dropIndex + 1, 0, draggedEvent)
            }
            else {
                day.eventsList.push(draggedEvent)
            }
            for (let i = 0; i < day.eventsList.length; i++) {
                dispatch(changeEventAction({
                    id: day.eventsList[i].id,
                    event: new CustomEvent(day.eventsList[i].title, day.date, i, day.eventsList[i].labels)
                }))
            }
        }

    }


    function handleChange(e: React.FormEvent<HTMLInputElement>, event: CustomEvent) {
        if (e.target instanceof Element) {
            dispatch(changeEventAction({
                id: event.id,
                event: new CustomEvent(e.currentTarget.value, day.date, event.order, event.labels)
            }))
        }

    }
    function handleClick(e: React.FormEvent<HTMLInputElement>) {
        e.stopPropagation()
    }

    function addLabel(event: CustomEvent) {
        let existingLabel = event.labels.findIndex((l: Label) => { return l.title === labelText })
        if (existingLabel !== -1) {
            dispatch(changeEventAction({
                id: event.id,
                event: new CustomEvent(event.title, day.date, event.order, event.labels.map((l: Label, index: number) => {
                    if (index === existingLabel) {
                        return {
                            title: event.labels[existingLabel].title,
                            color: labelColor
                        }
                    }
                    else {
                        return l;
                    }
                }))
            }))
        }
        else {
            dispatch(changeEventAction({
                id: event.id,
                event: new CustomEvent(event.title, day.date, event.order, [...event.labels, { title: labelText, color: labelColor }])
            }))
        }
    }



    function createLabel(l: Label) {

        return <div style={{ backgroundColor: l.color, color: getContrastColor(rgbToHex(l.color)) }} className="label">{l.title}</div>
    }

    function createEvent(e: CustomEvent): ReactElement {
        return (<EventWrapper key={e.id} data-id={e.id} draggable={true} onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation() }}
            onDragStart={(ev: React.DragEvent<HTMLDivElement>) => { dragStart(ev, day, e) }}
            onDragLeave={(ev: React.DragEvent<HTMLDivElement>) => { dragLeave(ev) }}
            onDragEnd={(ev: React.DragEvent<HTMLDivElement>) => { dragEnd(ev) }}
            onDragOver={(ev: React.DragEvent<HTMLDivElement>) => { dragOver(ev) }}
            onDrop={(ev: React.DragEvent<HTMLDivElement>) => { drop(ev, day, e) }}
        >
            <EventData >
                <input className='event-title' value={e.title} onClick={handleClick} onChange={(ev: React.FormEvent<HTMLInputElement>) => { handleChange(ev, e) }} />
                <img className='event-icon' src={addIcon} onClick={(ev: React.MouseEvent<HTMLImageElement>) => { ev.stopPropagation(); addLabelID === e.id ? setAddLabelID('') : setAddLabelID(e.id); }} />
                <img className='event-icon' src={deleteIcon} onClick={() => { dispatch(removeEventAction(e)) }} />
            </EventData>
            <>

                {e.labels.map((l) => createLabel(l))}
            </>
            <CreateLabel className={addLabelID === e.id ? '' : 'hidden'} >
                <LabelInputs>
                    <input type="text" className='label-title-input' value={labelText} onChange={(e: React.FormEvent<HTMLInputElement>) => { setLabelText(e.currentTarget.value) }} />
                    <input type="color" className='label-color-input' value={labelColor} onChange={(e: React.FormEvent<HTMLInputElement>) => { setLabelColor(e.currentTarget.value) }} />
                </LabelInputs>
                <AddLabelButton onClick={() => { addLabel(e) }} >ADD</AddLabelButton>
            </CreateLabel>
        </EventWrapper>)
    }

    return (
        <>
            {holiday ?
                <HolidayWrapper className='holiday'>
                    <EventData >
                        <span>{holiday.name}</span>
                    </EventData>
                </HolidayWrapper> : ""}
            {events.map(e => createEvent(e))}
        </>
    );
}

export default EventList;
