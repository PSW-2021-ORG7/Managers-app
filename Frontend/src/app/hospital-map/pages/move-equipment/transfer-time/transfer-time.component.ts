import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { EquipmentTransfer } from 'src/app/hospital-map/models/equipment/equipment-transfer.model';

@Component({
  selector: 'app-transfer-time',
  templateUrl: './transfer-time.component.html',
  styleUrls: ['./transfer-time.component.scss']
})

export class TransferTimeComponent /*implements OnInit, OnChange*/{

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  jsFromDate!: Date;
  jsToDate!: Date;
  minDate!:NgbDate; // for the calendar


  isTransferTimeSelected: boolean = false;
  //availableDates: TimeSlots[] = [];
  @Input() equipmentTransfer!: EquipmentTransfer;
  //@Output() selectFreeTimeSlot = new EventEmitter();


  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getToday();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  ngbDatetoDateCoverter(fromDate: NgbDate, toDate: NgbDate): void{
    this.jsFromDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
    this.jsToDate = new Date(toDate.year, toDate.month - 1, toDate.day);
  }


  search() : void{
   
  }

}

