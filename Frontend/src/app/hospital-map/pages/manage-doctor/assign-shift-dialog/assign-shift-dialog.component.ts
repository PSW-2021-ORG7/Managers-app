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
  shifts: Shift[] = [];
  isShiftSelected: boolean = false;
  selectedShiftId: number = -1;
  @Output() notifyCloseDialog: EventEmitter<string> = new EventEmitter<string>();

  constructor(private shiftService: ShiftService, private datepipe: DatePipe) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && changes.isVisible.currentValue == true) {
      const today = Date.now();
      this.shiftService.getShiftsFromDate(this.datepipe.transform(today, 'yyyy-MM-dd')!).subscribe(
        data => {
          this.shifts = data;
        }
      )
    }
  }

  selectShift(id: number): void{
    this.selectedShiftId = id;
    this.isShiftSelected = true;
  }

  onCancelClick(): void{
    this.notifyCloseDialog.emit("close");
  }

}
