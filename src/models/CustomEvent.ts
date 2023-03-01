import { Label } from "./Label";
import { generateUUID } from "../util";

export class CustomEvent {
    id: string = generateUUID()
    title: string;
    date: Date;
    labels: Array<Label> = [];
    order: number;
    changeDate(date: Date) { this.date = date;}
    addLabel(label: Label) { this.labels.push(label); }
    constructor(title: string, date: Date, order: number, labels: Array<Label> = []) {
        this.title = title;
        this.date = date;
        this.labels = labels;
        this.order = order;
    }

}