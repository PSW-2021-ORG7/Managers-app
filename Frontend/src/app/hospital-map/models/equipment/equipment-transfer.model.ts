export class EquipmentTransfer {
    public id: number;
    public sourceRoomId: number;
    public destinationRoomId: number;
    public quantity: number;
    public equipmentId: number;

    constructor(id: number, sourceRoomId: number, destinationRoomId: number, quantity: number, equipmentId: number) {
        this.id = id;
        this.sourceRoomId = sourceRoomId;
        this.destinationRoomId = destinationRoomId;
        this.quantity = quantity;
        this.equipmentId = equipmentId;
    }
}