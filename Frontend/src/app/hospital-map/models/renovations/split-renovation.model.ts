import { NewRoomInfo } from "./new-room-info.model";

export class SplitRenovation {
<<<<<<< HEAD
=======
    public id?: number;
>>>>>>> develop
    public roomId: number; 
    public firstNewRoomInfo: NewRoomInfo; 
    public secondNewRoomInfo: NewRoomInfo; 
    public start: Date; 
    public end: Date; 
    public equipmentDestination: string;
    
<<<<<<< HEAD
    constructor(roomId: number, firstNewRoomInfo: NewRoomInfo, secondNewRoomInfo: NewRoomInfo, start: Date, end: Date, equipmentDestination: string) {
=======
    constructor(roomId: number, firstNewRoomInfo: NewRoomInfo, secondNewRoomInfo: NewRoomInfo, start: Date, end: Date, equipmentDestination: string, id?: number) {
        this.id = id;
>>>>>>> develop
        this.roomId = roomId;
        this.firstNewRoomInfo = firstNewRoomInfo;
        this.secondNewRoomInfo = secondNewRoomInfo;
        this.start = start;
        this.end = end;
        this.equipmentDestination = equipmentDestination;
    }
}