export class EquipmentTransfer {
    public sourceRoomId: number;
    public destinationRoomId: number;
    public quantity: number;
    public equipmentId: number;
    public transferDuration: number;
    public transferStartDate: string;
    public transferEndDate: string;

    constructor(sourceRoomId: number, destinationRoomId: number, quantity: number, equipmentId: number, transferDuration: number, transferStartDate: string, transferEndDate: string) {
        this.sourceRoomId = sourceRoomId;
        this.destinationRoomId = destinationRoomId;
        this.quantity = quantity;
        this.equipmentId = equipmentId;
        this.transferDuration = transferDuration;
        this.transferStartDate = transferStartDate;
        this.transferEndDate = transferEndDate;
    }
}