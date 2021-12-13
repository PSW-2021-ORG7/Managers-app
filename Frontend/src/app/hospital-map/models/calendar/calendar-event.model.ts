export class CalendarEvent {
    public id: string;
    public title: string;
    public start: Date;
    public end: Date;
    public backgroundColor: string;

    constructor(id:string, title: string, start: Date, end: Date, backgroundColor: string) {
        this.id = id;
        this.title = title;
        this.start = start; 
        this.end = end;
        this.backgroundColor = backgroundColor;
    }
}