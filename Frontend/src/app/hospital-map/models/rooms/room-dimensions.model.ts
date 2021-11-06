export class RoomDimensions {
    private id: string;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(id: string, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}