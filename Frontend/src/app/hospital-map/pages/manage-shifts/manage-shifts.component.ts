import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shift } from '@app/hospital-map/models/shift/shift.model';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';

@Component({
  selector: 'app-manage-shifts',
  templateUrl: './manage-shifts.component.html',
  styleUrls: ['./manage-shifts.component.scss']
})
export class ManageShiftsComponent implements OnInit {
  shifts: Shift[] = [];
  isShiftSelected: boolean = false;
  selectedShift: Shift = new Shift(-1, "", new Date(), new Date());
  showOptionalDialog: boolean = false;
  createShiftDialogVisible: boolean = false;
  updateShiftDialogVisible: boolean = false;

  constructor(private shiftService: ShiftService, private router: Router) { }

  ngOnInit(): void {

    this.shiftService.getAllShifts().subscribe(
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
    this.shiftService.deleteShift(this.selectedShift).subscribe(
      data => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }
    );
    this.showOptionalDialog = false;
  }

  deleteShift(): void{
    this.showOptionalDialog = true;
  }

  createShift(): void{
    this.createShiftDialogVisible = true;
  }

  updateShift(): void{
    this.updateShiftDialogVisible = true;
  }

  onNotifyCloseDialog(message: string): void{
    if(message == "close"){
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }
  }

}
