import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentTransfer } from '../../models/equipment/equipment-transfer.model';
import { DestinationRoomOverviewComponent } from './destination-room-overview/destination-room-overview.component';
import { TransferTimeComponent } from './transfer-time/transfer-time.component';


@Component({
  selector: 'app-move-equipment',
  templateUrl: './move-equipment.component.html',
  styleUrls: ['./move-equipment.component.scss']
})
export class MoveEquipmentComponent {
  
  completedSteps: number = 0;
  mode: string = "equipment-overview";
  equipmentTransfer: EquipmentTransfer = new EquipmentTransfer(-1, -1, 1, -1, -1, new Date());
  @ViewChild(DestinationRoomOverviewComponent,{static: false}) destinationRoomComponent : any;
  @ViewChild(TransferTimeComponent,{static: false}) transferTimeComponent : any;

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
    this.transferTimeComponent.removeTimeSlots();
  }

  onEquipmentTransferChanged() : void{
    this.destinationRoomComponent.updateEquipmentTransfer(this.equipmentTransfer);
    this.completedSteps = 0;
  }
  
}