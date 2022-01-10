import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Holiday } from '@app/hospital-map/models/shift/holiday.model';
import { HolidayService } from '@app/hospital-map/shared/services/holiday.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-holiday-dialog',
  templateUrl: './assign-holiday-dialog.component.html',
  styleUrls: ['./assign-holiday-dialog.component.scss']
})
export class AssignHolidayDialogComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() doctorId: number = -1;
  @Input() doctorsHolidays: Holiday[] = [];
  @Output() notifyCloseHolidayDialog: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyReload: EventEmitter<any> = new EventEmitter<any>();
  holiday: Holiday = new Holiday(new Date(), new Date(), -1, "");
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate!: NgbDate;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private holidayService: HolidayService) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.holiday.doctorId = this.doctorId;
    this.convertNgbDateToDate();
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
    this.convertNgbDateToDate();
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

  convertNgbDateToDate(): void{
    if(this.fromDate != null)
      this.holiday.start = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      this.holiday.start.setHours(this.getHoursDiff(this.holiday.start));
      this.holiday.start.setMinutes(this.getMinutesDiff(this.holiday.start));
    if(this.toDate != null)
      this.holiday.end = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      this.holiday.end.setHours(this.getHoursDiff(this.holiday.end));
      this.holiday.end.setMinutes(this.getMinutesDiff(this.holiday.end));
  }

  getHoursDiff(date: Date): number {
    return date.getHours() - date.getTimezoneOffset() / 60;
  }

  getMinutesDiff(date: Date): number {
    return (date.getHours() - date.getTimezoneOffset()) % 60;
  }

  assignHoliday(): void {
    this.holidayService.postHoliday(this.holiday).subscribe(
      (data) => console.log("OK"),
      (error) => alert(error.error)
    );
    this.notifyCloseHolidayDialog.emit();
    this.notifyReload.emit();
  }

  cancel(): void {
    this.notifyCloseHolidayDialog.emit();
  }

}
