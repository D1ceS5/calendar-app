import { CustomEvent } from "./CustomEvent";

export class  Day{
    date: Date;
    column: number;
    isToday: boolean;
    active: boolean;
    eventsList: Array<CustomEvent>;

    constructor(date:Date,column:number,isToday:boolean,active: boolean){
        this.date = date;
        this.column = column
        this.isToday = isToday
        this.active = active
        this.eventsList = []
    }
}