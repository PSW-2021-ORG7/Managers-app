import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomEquipment } from '../../models/equipment/room-equipment.model';
import { EquipmentService } from '../../shared/services/equipment.service';
import { RoomsService } from '../../shared/services/rooms.service';


@Component({
  selector: 'app-move-equipment',
  templateUrl: './move-equipment.component.html',
  styleUrls: ['./move-equipment.component.scss']
})
export class MoveEquipmentComponent implements OnInit, OnChanges {


  constructor(private equipmentService: EquipmentService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.equipmentService.getEquipment().subscribe(
      data => {
        this.equipment = data;
      }
    )


  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isEquipmentSelected']){
      this.isEquipmentSelected = changes.isEquipmentSelected.currentValue;
    }
  }

  @Input() equipment: RoomEquipment[] = [];
  @Input() isEquipmentSelected: boolean = false;
  @Input() selectedSourceRoomId: number = -1;

  mode: string = "move-equipment";
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Select equipment for transfer";
  isSearchActive: boolean = false;
 
  onBackToMap(): void{
    this.router.navigate(['/hospital-map/'])
  }








  search() : void{
    if(this.searchInput != ""){
      this.isSearchActive = true;
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
    }
  }





}