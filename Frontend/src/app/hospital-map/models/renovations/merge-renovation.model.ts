import { NewRoomInfo } from "./new-room-info.model";

export class MergeRenovation {
<<<<<<< HEAD
=======
    public id?: number;
>>>>>>> develop
    public firstOldRoomId: number; 
    public secondOldRoomId: number; 
    public newRoomInfo: NewRoomInfo;
    public start: Date; 
    public end: Date; 
    
<<<<<<< HEAD
    constructor(firstOldRoomId: number, secondOldRoomId: number, newRoomInfo: NewRoomInfo, start: Date, end: Date) {
=======
    constructor(firstOldRoomId: number, secondOldRoomId: number, newRoomInfo: NewRoomInfo, start: Date, end: Date, id?: number) {
        this.id = id;
>>>>>>> develop
        this.firstOldRoomId = firstOldRoomId;
        this.secondOldRoomId = secondOldRoomId;
        this.newRoomInfo = newRoomInfo;
        this.start = start;
        this.end = end;
    }
}