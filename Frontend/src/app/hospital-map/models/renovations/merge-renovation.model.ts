import { NewRoomInfo } from "./new-room-info.model";

export class MergeRenovation {
    public firstOldRoomId: number; 
    public secondOldRoomId: number; 
    public newRoomInfo: NewRoomInfo;
    public start: Date; 
    public end: Date; 
    
    constructor(firstOldRoomId: number, secondOldRoomId: number, newRoomInfo: NewRoomInfo, start: Date, end: Date) {
        this.firstOldRoomId = firstOldRoomId;
        this.secondOldRoomId = secondOldRoomId;
        this.newRoomInfo = newRoomInfo;
        this.start = start;
        this.end = end;
    }
}