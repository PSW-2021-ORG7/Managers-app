export class Shift {
    public id: number;
    public name: string;
    public start: Date;
    public end: Date;

    constructor(){
        this.id = -1;
        this.name = "";
        this.start = new Date(); 
        this.end = new Date(); 
    }
}