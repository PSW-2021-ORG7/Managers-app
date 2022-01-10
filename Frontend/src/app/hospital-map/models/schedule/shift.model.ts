export class Shift {
    public id: number;
    public start: Date;
    public end: Date;
    public name: string;

    constructor(id: number, start: Date, end: Date, name: string){
        this.id = id;
        this.start = start;
        this.end = end;
        this.name = name;
    }
}
