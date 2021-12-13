import { RoomStatus, RoomType } from "../rooms/room.model";

export class NewRoomInfo{
    public roomName: string; 
    public roomType: RoomType;
    public roomStatus: RoomStatus;

    constructor(roomName: string, roomType: RoomType, roomStatus: RoomStatus){
        this.roomName = roomName;
        this.roomType = roomType;
        this.roomStatus = roomStatus;
    }
}