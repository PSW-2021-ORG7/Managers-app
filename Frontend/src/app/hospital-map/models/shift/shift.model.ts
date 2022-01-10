export class Shift {
    public id: number;
    public name: string;
    public start: Date;
    public end: Date;

    constructor(){
        this.id = -1;
        this.name = "";
        this.start = new Date(-8640000000000000); 
        this.end = new Date(-8640000000000000); 
    }
}