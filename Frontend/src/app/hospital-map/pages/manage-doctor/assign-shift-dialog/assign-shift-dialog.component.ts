import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Shift } from '@app/hospital-map/models/shift/shift.model';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';

@Component({
  selector: 'app-assign-shift-dialog',
  templateUrl: './assign-shift-dialog.component.html',
  styleUrls: ['./assign-shift-dialog.component.scss']
})
export class AssignShiftDialogComponent implements OnInit, OnChanges{

  @Input() isVisible: boolean = false;
  @Input() doctorId: number = -1;
  @Input() doctorsShifts: Shift[] = [];
  shifts: Shift[] = [];
  isShiftSelected: boolean = false;
  selectedShiftId: number = -1;
  @Output() notifyCloseDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(private shiftService: ShiftService, private datepipe: DatePipe) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && changes.isVisible.currentValue == true) {
      const today = Date.now();
      this.shiftService.getShiftsFromDate(this.datepipe.transform(today, 'yyyy-MM-dd')!).subscribe(
        data => {
          this.shifts = data;
          this.filterShifts();
        }
      )
    } else if(changes['doctorsShifts']){
      this.doctorsShifts = changes.doctorsShifts.currentValue;
    } else if(changes['doctorId']){
      this.doctorId = changes.doctorId.currentValue;
    }
  }

  filterShifts() {
      let difference = this.shifts.filter(({ id: id1 }) => !this.doctorsShifts.some(({ id: id2 }) => id2 == id1));
      difference.sort((a, b) => {
        var c = new Date(a.start);
        var d = new Date(b.start);
        return c > d ? 1 : -1;
      });
      this.shifts = difference;
  }

  selectShift(id: number): void{
    this.selectedShiftId = id;
    this.isShiftSelected = true;
  }

  onCancelClick(): void{
    this.notifyCloseDialog.emit({result: "close"});
  }

  assignShift(): void{
    let workday = {"doctorId": this.doctorId, "shiftId": this.selectedShiftId};
    this.shiftService.assignShiftToDoctor(workday).subscribe(
      data => {
        this.notifyCloseDialog.emit({result: "assignedShift", workday: data})
      },
      error => {
        if(error.status == 204)
            this.notifyCloseDialog.emit({result: "badRequest"})
      });
  }

}
