import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipment } from '../../models/equipments/equipment.model';


@Component({
  selector: 'app-move-equipment',
  templateUrl: './move-equipment.component.html',
  styleUrls: ['./move-equipment.component.scss']
})
export class MoveEquipmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() equipments: Equipment[] = [];
  @Input() isEquipmentSelected: boolean = false;

  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Select equipment for transfer";
  mode: string = "rooms";
  isSearchActive: boolean = false;

  @Output() notifyDisplayEquipment = new EventEmitter<number>();

  search() : void{
    if(this.searchInput != ""){
      this.isSearchActive = true;
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
    }
  }





}