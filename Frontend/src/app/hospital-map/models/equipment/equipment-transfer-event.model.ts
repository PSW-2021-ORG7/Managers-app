export class EquipmentTransferEvent {
        
    public sourceRoomId : number;
    public transferDate: Date;
    public transferDuration: number;
    public equipmentId : number;
    public quantity: number;

    constructor(){
        this.sourceRoomId = -1;
        this.transferDate = new Date();
        this.transferDuration = -1;
        this.equipmentId = -1;
        this.quantity = -1;
    }
        
}