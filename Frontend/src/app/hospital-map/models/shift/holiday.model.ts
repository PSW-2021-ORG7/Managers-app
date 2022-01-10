export class Holiday{

    public id?: number;
    public start: Date;
    public end: Date;
    public doctorId: number;
    public description: string;

    constructor(id: number, start: Date, end: Date, doctorId: number, description: string){
        this.id = id;
        this.start = start;
        this.end = end;
        this.doctorId = doctorId;
        this.description = description;
    }
}