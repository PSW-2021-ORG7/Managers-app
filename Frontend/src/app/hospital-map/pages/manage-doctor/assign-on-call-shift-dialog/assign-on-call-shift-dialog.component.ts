import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OnCallShift } from '@app/hospital-map/models/shift/on-call-shift.model';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';
import { NgbDate, NgbDatepickerConfig, NgbDateStruct, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-on-call-shift-dialog',
  templateUrl: './assign-on-call-shift-dialog.component.html',
  styleUrls: ['./assign-on-call-shift-dialog.component.scss']
})
export class AssignOnCallShiftDialogComponent implements OnInit, OnChanges {

  @Input() isVisible: boolean = false;
  @Input() doctorId: number = -1;
  @Input() doctorsOnCallShifts: OnCallShift[] = [];

  startTime: NgbTimeStruct = {hour: 23, minute: 0, second: 0};
  endTime: NgbTimeStruct = {hour: 8, minute: 0, second: 0};
  fromDate!: NgbDateStruct;
  disabledDates: NgbDateStruct[] = []

  
  isOnCallShiftSelected: boolean = false;
  
  @Output() notifyFromAssignOnCallShiftDialog: EventEmitter<string> = new EventEmitter<string>();

  constructor(config: NgbDatepickerConfig, private shiftService: ShiftService) { 
    const current = new Date();
    config.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()+2 };
    //config.markDisabled = this.isDisabled;   
  }

  ngOnInit(): void {}

  onCancelClick(): void{
    this.notifyFromAssignOnCallShiftDialog.emit("close");
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    
    if(changes['isVisible'] && changes.isVisible.currentValue == true) {
      //this.shiftService.getOnCallShifts()
    }
    else if(changes['doctorsOnCallShifts']){
      this.doctorsOnCallShifts = changes.doctorsOnCallShifts.currentValue;
      this.doctorsOnCallShifts.forEach(doctorsOnCall => {
          this.disabledDates.push({year: doctorsOnCall.start.getFullYear(),
                                   month: doctorsOnCall.start.getMonth(),
                                   day: doctorsOnCall.start.getDay()})
          console.log(doctorsOnCall);
      })
    }else if(changes['doctorId']){
      this.doctorId = changes.doctorId.currentValue;
    }
  }

  assignOnCallShift(): void{
    let startDate = new Date(this.fromDate.year, this.fromDate.month -1, this.fromDate.day, this.startTime.hour+1, this.startTime.minute, this.startTime.second);
    //let end = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day, this.endTime.hour, this.endTime.minute, this.endTime.second);
    let onCallShift = {start: startDate, doctorId: this.doctorId};
    this.shiftService.postOnCallShift(onCallShift).subscribe(
      data => {
        //this.document.location.reload();
      }



      /*
      data => {
        this.notifyFromAssignOnCallShiftDialog.emit({result: "assignedShift", workday: data})
      },
      error => {
        if(error.status == 204)
            this.notifyFromAssignOnCallShiftDialog.emit({result: "badRequest"})
      });

      */
    );

  }

  
}
