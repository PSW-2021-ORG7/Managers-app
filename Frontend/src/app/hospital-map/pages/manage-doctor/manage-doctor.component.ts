import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '@app/hospital-map/models/doctor/doctor.model';
import { Holiday } from '@app/hospital-map/models/shift/holiday.model';
import { OnCallShift } from '@app/hospital-map/models/shift/on-call-shift.model';
import { Shift } from '@app/hospital-map/models/shift/shift.model';
import { WorkdayShift } from '@app/hospital-map/models/shift/workday-shift.model';
import { DoctorService } from '@app/hospital-map/shared/services/doctor.service';
import { HolidayService } from '@app/hospital-map/shared/services/holiday.service';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';

@Component({
  selector: 'app-manage-doctor',
  templateUrl: './manage-doctor.component.html',
  styleUrls: ['./manage-doctor.component.scss']
})
export class ManageDoctorComponent implements OnInit {
  roomId: string = "";
  doctorId!: number;
  doctor!: Doctor;
  assignShiftDialogVisible: boolean = false;
  shifts: WorkdayShift[] = [];
  assignHolidayDialogVisible: boolean = false;
  onCallShifts: OnCallShift[] = [];
  holidays: Holiday[] = [];
  infoDialogTitle: string = "";
  infoDialogMessage: string  = "";
  infoDialogButtonText: string  = "";
  isInfoDialogVisible: boolean = false;
  newShift!: Shift;
  deleteShiftDialogVisible: boolean = false;
  title: string = "";
  description: string = "";
  deleteWorkdayId: number = -1;
  update: boolean = false;
  holidayId: number = -1;

  constructor(private doctorService: DoctorService, private shiftService: ShiftService, private holidayService: HolidayService, private route: ActivatedRoute, private router: Router) {
    if(router.getCurrentNavigation()?.extras.state?.roomId)
      this.roomId = router.getCurrentNavigation()?.extras.state?.roomId;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = parseInt(params['id']);
      this.doctorService.getDoctor(this.doctorId).subscribe(
        data => {
          this.doctor = data;
        }
      );
      this.shiftService.getShiftWorkdaysForDoctor(this.doctorId).subscribe(
        data => {
          this.shifts = data;
        }
      );
      this.holidayService.getHolidays(this.doctorId).subscribe(
        data => {
          this.holidays = data;
        }
      );
    })
  }

  onBack(): void{
    if(this.roomId != "")
      this.router.navigate(['/hospital-map/rooms/' + this.roomId]);
    else
      this.router.navigate(['/hospital-map/'])
  }

  toggleAssignShiftDialog(): void {
    this.assignShiftDialogVisible = !this.assignShiftDialogVisible;
  }

  toggleAssignHolidayDialog(): void {
    this.update = false;
    this.assignHolidayDialogVisible = !this.assignHolidayDialogVisible;
  }

  onNotifyFromAssignShiftDialog(messenger: any): void{
    this.assignShiftDialogVisible = false;
    if(messenger.result == "assignedShift"){
      this.showInfoDialog("Assigned shift", "The shift has successfully been added to the doctor.", "Okay");
        this.shiftService.getShift(messenger.workday.shiftId).subscribe(
          data => {
            this.newShift = data;
          }
        );
      } else if(messenger.result == "badRequest"){
        this.showInfoDialog("Bad request", "Unable to assign shift to doctor.", "Okay");
    }    
  }

  onNotifyFromDoctorScheduleCalendar(messenger: any): void{
    if(messenger.id.includes("workday")){
      this.deleteWorkdayId = parseInt(messenger.id.slice(0, -8));
      this.deleteShiftDialogVisible = true;
      this.title = "Delete workday?";
      this.description = "Are you sure you want to remove " + this.doctor.name + " " + this.doctor.surname + " from this working this day?" 
      this.deleteShiftDialogVisible = true;
    }
    if(messenger.id.includes("holiday")){
      this.assignHolidayDialogVisible = true;
      this.update = true;
      this.holidayId = parseInt(messenger.id.slice(0, -7));
    }
  }

  onNotifyCloseHolidayDialog() : void {
    this.update = false;
    this.assignHolidayDialogVisible = false;
  }

  showInfoDialog(title: string, message: string, buttonText: string) {
    this.infoDialogTitle = title;
    this.infoDialogMessage = message;
    this.infoDialogButtonText = buttonText;
    this.isInfoDialogVisible = true;
  }

  onInfoDialogNotify(message: string): void{
    if(message == "close")
      this.isInfoDialogVisible = false;
  }

  onNotifyConfirmButton(): void{
    this.deleteShiftDialogVisible = false;
    if(this.deleteWorkdayId != -1)
      this.shiftService.removeShiftFromDoctor(this.deleteWorkdayId).subscribe(
        data => {
          this.reload();
          this.showInfoDialog("Removed workday", "Sucessfuly removed workday from Dr. " + this.doctor.name + " " +  this.doctor.surname + "'s schedule.", "Okay");
        }
      );
  }

  onNotifyCancelButton(): void{
    this.deleteShiftDialogVisible = false;
    this.deleteWorkdayId = -1;
  }

  reload(): void {
    document.location.reload();
  }

}
