import { RoomType } from "../rooms/room.model";



export class Equipment {
    public id: number;
    public roomId: number;
    public roomName: string;
    public type: RoomType;
    public roomFloor: number;
    public equipmentItemId: number;
    public equipmentItemName: string;
    public equipmentItemDescription: string;
    public quantity: number;



    constructor(id: number, roomId: number, roomName: string, type: RoomType, roomFloor: number, equipmentItemId: number, equipmentItemName: string, equipmentItemDescription:string, quantity: number) {
        this.id = id;
        this.roomId = roomId;
        this.roomName = roomName;
        this.type = type;
        this.roomFloor = roomFloor;
        this.equipmentItemId = equipmentItemId;
        this.equipmentItemName = equipmentItemName;
        this.equipmentItemDescription = equipmentItemDescription;
        this.quantity = quantity;
    }


}
