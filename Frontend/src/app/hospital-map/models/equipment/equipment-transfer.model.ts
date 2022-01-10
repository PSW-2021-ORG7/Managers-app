<<<<<<< HEAD
export class EquipmentTransfer {
    public sourceRoomId: number;
    public destinationRoomId: number;
=======
import { RoomType } from "../rooms/room.model";

export class EquipmentTransfer {
    public id?: number;
    public sourceRoomId: number;
    public sourceRoomName: string;
    public sourceRoomType: RoomType;
    public destinationRoomId: number;
    public destinationRoomName: string;
    public destinationRoomType: RoomType;
>>>>>>> develop
    public quantity: number;
    public equipmentId: number;
    public transferDuration: number;
    public transferDate: Date;

<<<<<<< HEAD
    constructor(sourceRoomId: number, destinationRoomId: number, quantity: number, equipmentId: number, transferDuration: number, transferDate: Date){
        this.sourceRoomId = sourceRoomId;
        this.destinationRoomId = destinationRoomId;
=======
    constructor(sourceRoomId: number, sourceRoomName: string, sourceRoomType: RoomType, destinationRoomId: number, destinationRoomName: string, destinationRoomType: RoomType, quantity: number, equipmentId: number, transferDuration: number, transferDate: Date, id?: number){
        this.id = id;
        this.sourceRoomId = sourceRoomId;
        this.sourceRoomName = sourceRoomName;
        this.sourceRoomType = sourceRoomType;
        this.destinationRoomId = destinationRoomId;
        this.destinationRoomName = destinationRoomName;
        this.destinationRoomType = destinationRoomType;
>>>>>>> develop
        this.quantity = quantity;
        this.equipmentId = equipmentId;
        this.transferDuration = transferDuration;
        this.transferDate = transferDate;
    }
}