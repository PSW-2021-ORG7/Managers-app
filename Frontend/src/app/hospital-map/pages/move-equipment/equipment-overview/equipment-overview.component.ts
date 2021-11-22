import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(private equipmentService: EquipmentService) { }

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
    this.isSelectedEquipment = true;
  }

  removeSelectedEquipment(): void{
    this.isSelectedEquipment = false;
  }



}
