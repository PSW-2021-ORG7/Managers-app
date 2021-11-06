import { RoomDimensions } from "./room-dimensions.model";

enum RoomStatus {
    Occupied,
    Unoccupied,
    IsBeingRenovated,
    NotActive
}

enum RoomType {
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
    private id: string;
    private buildingId: string;
    private name: string;
    private status: RoomStatus;
    private type: RoomType;
    private freeBeds: number;
    private floor: number;
    private roomDimensions: RoomDimensions;

    constructor(id: string, buildingId: string, name: string, status: RoomStatus, type: RoomType, freeBeds: number, floor: number, roomDimensions: RoomDimensions) {
        this.id = id;
        this.buildingId = buildingId;
        this.name = name;
        this.status = status;
        this.type = type;
        this.freeBeds = freeBeds;
        this.floor = floor;
        this.roomDimensions = roomDimensions;
    }
}
