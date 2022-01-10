import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-shift-dialog',
  templateUrl: './create-shift-dialog.component.html',
  styleUrls: ['./create-shift-dialog.component.scss']
})
export class CreateShiftDialogComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() notifyCloseDialog: EventEmitter<string> = new EventEmitter<string>();
  formGroup!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = new FormGroup({
      activeEndDate: new FormControl(new Date(), {
        validators: [Validators.required]
      })
    });
  }
}
