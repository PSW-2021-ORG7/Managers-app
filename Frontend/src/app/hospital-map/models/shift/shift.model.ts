export class Shift {
    public id: number;
    public name: string;
    public start: Date;
    public end: Date;

    constructor(id: number, name: string, start: Date, end: Date){
        this.id = id;
        this.name = name;
        this.start = start; 
        this.end = end; 
    }
}