export class EquipmentTransfer {
    public sourceRoomId: number;
    public destinationRoomId: number;
    public quantity: number;
    public equipmentId: number;
    public transferDuration: number;
    public transferDate: Date;

    constructor(sourceRoomId: number, destinationRoomId: number, quantity: number, equipmentId: number, transferDuration: number, transferDate: Date){
        this.sourceRoomId = sourceRoomId;
        this.destinationRoomId = destinationRoomId;
        this.quantity = quantity;
        this.equipmentId = equipmentId;
        this.transferDuration = transferDuration;
        this.transferDate = transferDate;
    }
}