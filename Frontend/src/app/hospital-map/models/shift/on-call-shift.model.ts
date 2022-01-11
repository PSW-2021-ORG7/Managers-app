export class OnCallShift {
    public id: number;
    public start: Date;
    public doctorId: number;

    constructor(id: number, start: Date, doctorId: number){
        this.id = id;
        this.start = start;
        this.doctorId = doctorId;
    }
}