import { Component, OnInit } from '@angular/core';
import { Shift } from '@app/hospital-map/models/schedule/shift.model';
import { ShiftsService } from '@app/hospital-map/shared/services/shifts.service';

@Component({
  selector: 'app-manage-shifts',
  templateUrl: './manage-shifts.component.html',
  styleUrls: ['./manage-shifts.component.scss']
})
export class ManageShiftsComponent implements OnInit {
  shifts: Shift[] = [];
  isShiftSelected: boolean = false;
  selectedShift: any = null;
  showOptionalDialog: boolean = false;
  createShiftDialogVisible: boolean = false;

  constructor(private shiftsService: ShiftsService) { }

  ngOnInit(): void {

    this.shiftsService.getShifts().subscribe(
      data => {
        this.shifts = data;
      }
    );
  }

  selectShift(shift: any): void{
    this.isShiftSelected = true;
    this.selectedShift = shift;
  }

  onNotifyCancelButton(){
    this.showOptionalDialog = false;
  }

  onNotifyConfirmButton(){
    this.showOptionalDialog = false;
  }

  deleteShift(): void{
    this.showOptionalDialog = true;
  }

  createShift(): void{
    this.createShiftDialogVisible = true;
  }

  onNotifyCloseDialog(message: string): void{
    if(message == "close")
      this.createShiftDialogVisible = false;
  }

}
