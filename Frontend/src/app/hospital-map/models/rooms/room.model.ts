enum RoomStatus {
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
    public id: string;
    public buildingId: string;
    public name: string;
    public status: RoomStatus;
    public type: RoomType;
    public freeBeds: number;
    public floor: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(id: string, buildingId: string, name: string, status: RoomStatus, type: RoomType, freeBeds: number, floor: number, x: number, y: number, width: number, height: number) {
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
    }


}
