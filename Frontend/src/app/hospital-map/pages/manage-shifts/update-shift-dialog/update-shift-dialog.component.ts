import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Shift } from '@app/hospital-map/models/shift/shift.model';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-shift-dialog',
  templateUrl: './update-shift-dialog.component.html',
  styleUrls: ['./update-shift-dialog.component.scss'],
  providers: [ NgbTimepickerConfig]
})
export class UpdateShiftDialogComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() selectedShift!: Shift;
  @Output() notifyCloseDialog: EventEmitter<string> = new EventEmitter<string>();
  startTime: NgbTimeStruct = {hour: 13, minute: 0, second: 0};
  endTime: NgbTimeStruct = {hour: 20, minute: 0, second: 0};

  constructor(config: NgbTimepickerConfig, private shiftService: ShiftService) { 
    config.spinners = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedShift']){
      if(this.selectedShift.id !== -1){
        this.selectedShift = changes.selectedShift.currentValue;
        let start = new Date(this.selectedShift.start)
        let end = new Date(this.selectedShift.end)
        this.startTime.hour = start.getHours();
        this.startTime.minute = start.getMinutes();
        this.endTime.hour = end.getHours();
        this.endTime.minute = end.getMinutes();
      }
    }
  }

  ngOnInit(): void {
  }

  onCancelClick(): void{
    this.notifyCloseDialog.emit("close");
  }

  updateShift(): void{
    let start = new Date(this.selectedShift.start)
    let end = new Date(this.selectedShift.end)
    start.setHours(this.startTime.hour + 1);
    start.setMinutes(this.startTime.minute);
    end.setHours(this.endTime.hour + 1);
    end.setMinutes(this.endTime.minute);
    let shift = new Shift(this.selectedShift.id, this.selectedShift.name, start, end)
    this.shiftService.putShift(shift).subscribe(
      data => {
        this.notifyCloseDialog.emit("close");
      }
    );
  }

}
