import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbDateStruct, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
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
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  fromDate!: NgbDateStruct;
  
  constructor(config: NgbTimepickerConfig) { 
    config.spinners = false;
  }

  ngOnInit(): void {}

}
