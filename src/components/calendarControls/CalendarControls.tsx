import {
    ControlButton,
    Controls,
    ControlsWrapper,
    ImportButton,
    ImportLabel,
    AccentButton,
    Filters,
    SearchInput,
    LabelFilters,
    LabelButton
} from "./CalendatControls.styles";
import { Month } from "../../models/Month";
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { setEventsAction } from '../../state/reducers/eventReducer'
import { CustomEvent } from "../../models/CustomEvent";
import { Label } from "../../models/Label";
import html2canvas from 'html2canvas';
import { getContrastColor, rgbToHex } from '../../util'

type Props = {
    title: string,
    changeMonth: (date: Date) => void,
    month: Month,
    filterTitle: string,
    setFilterTitle: (s: string) => void,
    filterLabels: Label[],
    setFilterLabels: (labels: Label[]) => void
}

function CalendarControls({ title, changeMonth, month, filterTitle, setFilterTitle, filterLabels, setFilterLabels }: Props) {
    const { eventList } = useAppSelector(state => state)

    const dispatch = useAppDispatch()



    function handleSaveImage() {
        const element = document.getElementById("calendar");
        if (element) {
            html2canvas(element).then((canvas) => {
                const imageUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'calendar.png';
                link.href = imageUrl;
                link.click();
            })
        }
    }
    function subtractMonth(date: Date): Date {
        let dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return new Date(date.getTime() - (1000 * 60 * 60 * 24 * dayCount));
    }
    function plusMonth(date: Date): Date {
        return new Date(date.getTime() + (1000 * 60 * 60 * 24));
    }
    function onPrevClick(): void {
        let prevMonth = new Date(month.date)
        changeMonth(subtractMonth(prevMonth));
    }

    function onNextClick(): void {
        let nextMonth = new Date(month.date)
        changeMonth(plusMonth(nextMonth));
    }

    function onTodayClick(): void {
        changeMonth(new Date());
    }

    function onExportClick() {
        const blob = new Blob([JSON.stringify(eventList)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `events.json`;
        link.dispatchEvent(new MouseEvent('click'));
        URL.revokeObjectURL(url);
    }

    function handleObjectFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            console.error('Error uploading file');
            return;
        }

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
            try {
                const objectData = JSON.parse(reader.result as string);
                if (isObjectValid(objectData)) {
                    dispatch(setEventsAction(objectData.map((e: CustomEvent) => new CustomEvent(e.title, new Date(e.date), e.order, e.labels))));
                } else {
                    console.error('Validation failed');
                }
            } catch (error) {
                console.error('Unexpected file format');
            }
        };

        reader.onerror = () => {
            console.error('Error uploading file');
        };
    }

    function isObjectValid(data: any): boolean {
        return data instanceof Array && data.every((el) => { return el.title && el.date && !isNaN(el.order) && el.labels instanceof Array });
    }

    function getUniqueLabels(): Label[] {
        let uniqueLabels: Label[] = [];
        for (let event of eventList) {
            for (let label of event.labels) {
                if (!uniqueLabels.some(l => l.title === label.title && l.color === label.color)) {
                    uniqueLabels.push(label)
                }
            }
        }
        return uniqueLabels
    }

    function labelOnClick(l: Label) {
        let labelIndex = filterLabels.indexOf(l)
        if (labelIndex >= 0) {
            setFilterLabels(filterLabels.filter(label => label !== l))
        }
        else {
            setFilterLabels([...filterLabels, l])
        }
    }

    return (
        <ControlsWrapper>
            <div className="title">{title}</div>
            <Controls>
                <ControlButton onClick={onTodayClick}>TODAY</ControlButton>
                <ControlButton onClick={onPrevClick}>PREV</ControlButton>
                <ControlButton onClick={onNextClick}>NEXT</ControlButton>
                <AccentButton onClick={handleSaveImage}>SAVE IMAGE</AccentButton>
                <AccentButton onClick={onExportClick}>EXPORT</AccentButton>
                <ImportLabel htmlFor="file-upload" className="custom-file-upload">IMPORT</ImportLabel>
                <ImportButton type="file" id="file-upload" onChange={handleObjectFileUpload}></ImportButton>
            </Controls>
            <Filters>
                <SearchInput type="text" value={filterTitle} placeholder="Search..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFilterTitle(e.currentTarget.value) }} />
                <LabelFilters>
                    {getUniqueLabels().map((l) => {
                        return <LabelButton onClick={() => { labelOnClick(l) }} style={{ fontWeight: filterLabels.indexOf(l) === -1 ? "normal" : "bold", backgroundColor: l.color, color: getContrastColor(rgbToHex(l.color)) }}>{l.title}</LabelButton>
                    })}
                </LabelFilters>
            </Filters>
        </ControlsWrapper>
    );
}

export default CalendarControls;
