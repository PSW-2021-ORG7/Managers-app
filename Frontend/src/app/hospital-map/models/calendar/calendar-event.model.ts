export class CalendarEvent {
    public title: string;
    public start: Date;
    public end: Date;
    public backgroundColor: string;

    constructor(title: string, start: Date, end: Date, backgroundColor: string) {
        this.title = title;
        this.start = start; 
        this.end = end;
        this.backgroundColor = backgroundColor;
    }
}