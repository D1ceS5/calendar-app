import {Day} from "./Day";
import { monthNames,isToday } from "../util";


export class Month{
    days: Array<Day>
    title: string
    date:Date

    constructor(initialDate:Date) {
        const today = new Date()
        this.days = []
        this.date = initialDate
        this.title = `${monthNames[initialDate.getMonth()]} ${initialDate.getFullYear()}`
        let dayCount:number = new Date(initialDate.getFullYear(), initialDate.getMonth()+1, 0).getDate();

        initialDate.setDate(1);
        let firstDay: number = initialDate.getDay();
        initialDate.setDate(dayCount);
        let lastDay: number = initialDate.getDay();

        for(let i = 1;i<=dayCount;i++){
            let currentDate = new Date(initialDate)
            currentDate.setDate(i);
            const day: Day =  new Day(currentDate,currentDate.getDay(),isToday(currentDate,today),true)
             
            this.days.push(day)
        }
        for(let i = 0;i<firstDay;i++){
            let currentDate = new Date(initialDate)
            currentDate.setDate(1-(i+1));
            const day =  new Day(currentDate,currentDate.getDay(),isToday(currentDate,today),false)
            this.days.unshift(day)
        }
        let increment = 1;
        for(let i = lastDay+1;i<=6;i++){
            let currentDate = new Date(initialDate)
            currentDate.setDate(dayCount+increment++);
            const day= new Day(currentDate,currentDate.getDay(),isToday(currentDate,today),false)
            this.days.push(day)
        }
    }

}