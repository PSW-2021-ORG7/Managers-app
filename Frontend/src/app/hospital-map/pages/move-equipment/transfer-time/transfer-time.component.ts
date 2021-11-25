import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { EquipmentTransfer } from 'src/app/hospital-map/models/equipment/equipment-transfer.model';
import { EquipmentTransferService } from 'src/app/hospital-map/shared/services/equipment-tranfser.service';

@Component({
  selector: 'app-transfer-time',
  templateUrl: './transfer-time.component.html',
  styleUrls: ['./transfer-time.component.scss']
})

export class TransferTimeComponent implements OnInit{

  @Input() equipmentTransfer!: EquipmentTransfer;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate!:NgbDate;
  isSearchDisabled: boolean = true;
  timeSlots: any[] = [];

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private equipmentTransferService: EquipmentTransferService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getToday();
  }

  ngOnInit(){
    this.convertDatesToString();
    this.checkIfCanSearch();
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
    this.convertDatesToString();
    this.checkIfCanSearch();
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

  private convertDatesToString(): void{
    let fromDateString = "";
    let toDateString = "";
    if(this.fromDate != null)
      fromDateString = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    else
      fromDateString = "";
    if(this.toDate != null)
      toDateString = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
    else
      toDateString = "";
      this.equipmentTransfer.transferStartDate = fromDateString;
      this.equipmentTransfer.transferEndDate = toDateString;
  }

  onDurationChange(newValue : number): void{
    this.equipmentTransfer.transferDuration = newValue;
    this.checkIfCanSearch();
  }

  checkIfCanSearch(): void{
    if(this.equipmentTransfer.transferDuration != -1 && this.equipmentTransfer.transferStartDate != "" && this.equipmentTransfer.transferEndDate != "")
      this.isSearchDisabled = false;
    else
      this.isSearchDisabled = true;
  }

  searchAvailableTimeSlots(): void{
    this.equipmentTransferService.getAvailableTimeSlots(this.equipmentTransfer).subscribe(
      data => {
        this.timeSlots = data;
      }
    )
  }

}

