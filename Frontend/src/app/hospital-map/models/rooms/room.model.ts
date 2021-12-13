import { Equipment } from "./equipment.model";

export enum RoomStatus {
    Occupied,
    Unoccupied,
    IsBeingRenovated,
    NotActive
}
export enum RoomType {
    OperatingRoom,
    SurgeryRoom,
    ExaminationRoom,
    EmergencyRoom,
    DoctorOffice,
    Restroom,
    Lift,
    Stairs,
    Storage
}

export class Room {
    public id: number;
    public buildingId: number;
    public name: string;
    public status: RoomStatus;
    public type: RoomType;
    public freeBeds: number;
    public floor: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public equipment: Equipment[];

    constructor(id: number, buildingId: number, name: string, status: RoomStatus, type: RoomType, freeBeds: number, floor: number, x: number, y: number, width: number, height: number, equipment: Equipment[]) {
        this.id = id;
        this.buildingId = buildingId;
        this.name = name;
        this.status = status;
        this.type = type;
        this.freeBeds = freeBeds;
        this.floor = floor;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.equipment = equipment;
    }


}
