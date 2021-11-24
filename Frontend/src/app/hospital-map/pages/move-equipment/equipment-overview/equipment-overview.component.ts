import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentTransfer } from 'src/app/hospital-map/models/equipment/equipment-transfer.model';
import { RoomEquipment } from 'src/app/hospital-map/models/equipment/room-equipment.model';
import { EquipmentService } from 'src/app/hospital-map/shared/services/equipment.service';

@Component({
  selector: 'app-equipment-overview',
  templateUrl: './equipment-overview.component.html',
  styleUrls: ['./equipment-overview.component.scss']
})
export class SelectedEquipmentComponent implements OnInit, OnChanges{

  equipment: RoomEquipment[] = [];
  isEquipmentSelected: boolean = false;
  filteredEquipment: RoomEquipment[] = [];
  isSelectedEquipment: boolean = false;
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Select equipment for transfer";
  isSearchActive: boolean = false;
  selectedEquipment!: RoomEquipment;
  @Input() equipmentTransfer!: EquipmentTransfer;
  @Output() confirmQuantityEvent = new EventEmitter();

  constructor(private equipmentService: EquipmentService, private router: Router) { }

  ngOnInit(): void {
    this.equipmentService.getEquipment().subscribe(
      data => {
        this.equipment = data;
        this.filteredEquipment = data;
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isEquipmentSelected']){
      this.isEquipmentSelected = changes.isEquipmentSelected.currentValue;
    }
  }

  search() : void{
    if(this.searchInput != ""){
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
      this.isSearchActive = true;

      let equipment = this.equipment;
      equipment = equipment.filter(param => param.equipmentItemName.toLowerCase().includes(this.searchFilter));
      this.filteredEquipment = equipment;
    }
  }

  removeFilter() : void{
    this.isSearchActive = false;
    this.searchInput = "";
    this.filteredEquipment = this.equipment;
  }

  onNotifySelectedEquipment(selectedEquipment: RoomEquipment): void{
    this.selectedEquipment = selectedEquipment;
    this.equipmentTransfer.sourceRoomId = selectedEquipment.roomId;
    this.equipmentTransfer.equipmentId = selectedEquipment.id;
    this.equipmentTransfer.quantity = 1;
    this.isSelectedEquipment = true;
  }

  removeSelectedEquipment(): void{
    this.isSelectedEquipment = false;
  }

  decreaseQuantity(): void{
    if(this.equipmentTransfer.quantity > 1) {
      this.equipmentTransfer.quantity--;
    }
  }

  increaseQuantity(): void{
    if(this.equipmentTransfer.quantity < this.selectedEquipment.quantity) {
      this.equipmentTransfer.quantity++;
    }
  }

  quantityChange(newValue: number) {
    if(newValue < 1) {
      this.equipmentTransfer.quantity = 1;
    }
    if(newValue > this.selectedEquipment.quantity) {
      this.equipmentTransfer.quantity = this.selectedEquipment.quantity;
    }
  }

  confirmQuantity(){
    this.confirmQuantityEvent.emit();
  }

}
