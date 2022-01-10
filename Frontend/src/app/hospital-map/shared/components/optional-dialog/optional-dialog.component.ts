import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-optional-dialog',
  templateUrl: './optional-dialog.component.html',
  styleUrls: ['./optional-dialog.component.scss']
})
export class OptionalDialogComponent implements OnInit {

  @Input() title: string="";
  @Input() description: string="";
  @Input() cancelText: string="";
  @Input() confirmText: string="";

  constructor() { }

  @Output() notifyCancelButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyConfirmButton: EventEmitter<any> = new EventEmitter<any>();

  cancelButton(){
    this.notifyCancelButton.emit();
  }

  confirmButton(){
    this.notifyConfirmButton.emit();
  }

  ngOnInit(): void {
  
  
  }





}
