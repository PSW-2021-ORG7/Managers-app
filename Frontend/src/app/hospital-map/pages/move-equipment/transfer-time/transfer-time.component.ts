import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  transferStartDate : string = "";
  transferEndDate: string = "";
  timeSlots: any[] = [];
  timeSlotSelected: boolean = false;
  selectedTimeSlot: any = null;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private equipmentTransferService: EquipmentTransferService, private router: Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getToday();
  }

  ngOnInit(){
    this.convertDatesToString();
    this.checkIfCanSearch();
  }

  public removeTimeSlots() {
    this.timeSlots  = [];
    this.timeSlotSelected = false;
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
    if(this.toDate != null)
      toDateString = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
    this.transferStartDate = fromDateString;
    this.transferEndDate = toDateString;
  }

  onDurationChange(newValue : number): void{
    this.equipmentTransfer.transferDuration = newValue;
    this.checkIfCanSearch();
  }

  checkIfCanSearch(): void{
    if(this.equipmentTransfer.transferDuration != -1 && this.transferStartDate != "" && this.transferEndDate != "")
      this.isSearchDisabled = false;
    else
      this.isSearchDisabled = true;
  }

  searchAvailableTimeSlots(): void{
    this.equipmentTransferService.getAvailableTimeSlots(this.equipmentTransfer, this.transferStartDate, this.transferEndDate).subscribe(
      data => {
        this.timeSlots = data;
      }
    )
    this.timeSlotSelected = false;
  }

  selectTimeSlot(timeSlot: any): void{
    this.equipmentTransfer.transferDate = timeSlot.start;
    this.timeSlotSelected = true;
    this.selectedTimeSlot = timeSlot;
  }

  scheduleTransfer() : void{
    if(this.timeSlotSelected) {
      this.equipmentTransferService.postEquipmentTransfer(this.equipmentTransfer).subscribe();
      this.router.navigate(['/hospital-map/']);
    }
  }

}

