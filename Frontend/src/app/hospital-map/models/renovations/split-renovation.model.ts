import { NewRoomInfo } from "./new-room-info.model";

export class SplitRenovation {
    public id?: number;
    public roomId: number; 
    public firstNewRoomInfo: NewRoomInfo; 
    public secondNewRoomInfo: NewRoomInfo; 
    public start: Date; 
    public end: Date; 
    public equipmentDestination: string;
    
    constructor(roomId: number, firstNewRoomInfo: NewRoomInfo, secondNewRoomInfo: NewRoomInfo, start: Date, end: Date, equipmentDestination: string, id?: number) {
        this.id = id;
        this.roomId = roomId;
        this.firstNewRoomInfo = firstNewRoomInfo;
        this.secondNewRoomInfo = secondNewRoomInfo;
        this.start = start;
        this.end = end;
        this.equipmentDestination = equipmentDestination;
    }
}