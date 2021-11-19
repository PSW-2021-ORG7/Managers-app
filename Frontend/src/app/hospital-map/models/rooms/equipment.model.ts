export class Equipment {
    public id: number;
    public equipmentItemId: number;
    public equipmentItemName: string;
    public equipmentItemDescription: string;
    public quantity: number;

    constructor(id: number, equipmentItemId: number, equipmentItemName: string, equipmentItemDescription: string, quantity: number) {
        this.id = id;
        this.equipmentItemId = equipmentItemId;
        this.equipmentItemName = equipmentItemName;
        this.equipmentItemDescription = equipmentItemDescription;
        this.quantity = quantity;
    }
}