import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  @Input() title: string = "Title";
  @Input() message: string = "Message";
  @Input() buttonText: string = "Button text";
  @Output() notify: EventEmitter<string> = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit(): void {
  }

  closeDialog(): void{
    this.notify.emit('close');
  }

}
