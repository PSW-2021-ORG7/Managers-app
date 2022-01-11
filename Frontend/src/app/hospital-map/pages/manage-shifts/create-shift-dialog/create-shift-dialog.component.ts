import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';
import {NgbCalendar, NgbDate, NgbDateStruct, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-shift-dialog',
  templateUrl: './create-shift-dialog.component.html',
  styleUrls: ['./create-shift-dialog.component.scss'],
  providers: [ NgbTimepickerConfig]
})
export class CreateShiftDialogComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() notifyCloseDialog: EventEmitter<string> = new EventEmitter<string>();
  startTime: NgbTimeStruct = {hour: 13, minute: 0, second: 0};
  endTime: NgbTimeStruct = {hour: 20, minute: 0, second: 0};
  fromDate!: NgbDateStruct;
  shiftName: string = "";
  minDate!:NgbDate;
  
  constructor(config: NgbTimepickerConfig, private shiftService: ShiftService, private calendar: NgbCalendar) { 
    config.spinners = false;
    this.minDate = this.fromDate = calendar.getToday();
  }

  ngOnInit(): void {}

  onCancelClick(): void{
    this.notifyCloseDialog.emit("close");
  }

  createShift(): void{
    let startTime = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, this.startTime.hour + 1, this.startTime.minute);
    let endTime = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, this.endTime.hour + 1, this.endTime.minute);
    let shift = {name: this.shiftName, start: startTime, end: endTime};
    this.shiftService.postShift(shift).subscribe(
      data => {
        this.notifyCloseDialog.emit("close");
      }
    );
  }

}
