import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '@app/hospital-map/models/doctor/doctor.model';
import { Holiday } from '@app/hospital-map/models/shift/holiday.model';
import { OnCallShift } from '@app/hospital-map/models/shift/on-call-shift.model';
import { Shift } from '@app/hospital-map/models/shift/shift.model';
import { DoctorService } from '@app/hospital-map/shared/services/doctor.service';
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
  shifts: Shift[] = [];
  onCallShifts: OnCallShift[] = [];
  holidays: Holiday[] = [];
  infoDialogTitle: string = "";
  infoDialogMessage: string  = "";
  infoDialogButtonText: string  = "";
  isInfoDialogVisible: boolean = false;

  constructor(private doctorService: DoctorService, private shiftService: ShiftService, private route: ActivatedRoute, private router: Router) {
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
      this.shiftService.getShifts(this.doctorId).subscribe(
        data => {
          this.shifts = data;
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

  toggleAssignShiftDialog(): void{
    this.assignShiftDialogVisible = !this.assignShiftDialogVisible;
  }

  onNotifyCloseDialog(message: string): void{
    if(message == "close")
      this.assignShiftDialogVisible = false;
    else if(message == "badRequest"){
      this.assignShiftDialogVisible = false;
      this.showInfoDialog("Assigned shift", "The shift has successfully been added to the doctor.", "Okay");
      
    }
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

}
