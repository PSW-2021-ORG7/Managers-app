export class OnCallShift {
    public id: number;
    public name: string;
    public date: Date;

    constructor(){
        this.id = -1;
        this.name = "";
        this.date = new Date(); 
    }
}