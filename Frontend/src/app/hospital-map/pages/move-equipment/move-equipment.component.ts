import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AvailableTimeSlotsComponent } from '@app/hospital-map/shared/components/available-time-slots/available-time-slots.component';
import { EquipmentTransfer } from '../../models/equipment/equipment-transfer.model';
import { DestinationRoomOverviewComponent } from './destination-room-overview/destination-room-overview.component';


@Component({
  selector: 'app-move-equipment',
  templateUrl: './move-equipment.component.html',
  styleUrls: ['./move-equipment.component.scss']
})
export class MoveEquipmentComponent {
  
  completedSteps: number = 0;
  mode: string = "equipment-overview";
  equipmentTransfer: EquipmentTransfer = new EquipmentTransfer(-1, "", 0, -1, "", 0, 1, -1, -1, new Date());
  @ViewChild(DestinationRoomOverviewComponent,{static: false}) destinationRoomComponent : any;
  @ViewChild(AvailableTimeSlotsComponent,{static: false}) availableTimeSlotsComponent : any;

  constructor(private router: Router) { }
  
  onBackToMap(): void{
    this.router.navigate(['/hospital-map/'])
  }

  confirmEquipmentQuantity(){
    this.completedSteps += 1;
    this.mode = "destination-room";
  }

  selectDestinationRoom(){
    this.completedSteps += 1;
    this.mode = "transfer-time";
    this.availableTimeSlotsComponent.removeTimeSlots();
  }

  onEquipmentTransferChanged() : void{
    this.destinationRoomComponent.updateEquipmentTransfer(this.equipmentTransfer);
    this.completedSteps = 0;
  }
  
}