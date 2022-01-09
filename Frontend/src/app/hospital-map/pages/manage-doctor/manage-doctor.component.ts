import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '@app/hospital-map/models/doctor/doctor.model';
import { DoctorService } from '@app/hospital-map/shared/services/doctor.service';

@Component({
  selector: 'app-manage-doctor',
  templateUrl: './manage-doctor.component.html',
  styleUrls: ['./manage-doctor.component.scss']
})
export class ManageDoctorComponent implements OnInit {

  roomId: string = "";
  doctorId: number = 0
  doctor!: Doctor;

  constructor(private doctorService: DoctorService, private route: ActivatedRoute, private router: Router) {
    if(router.getCurrentNavigation()?.extras.state?.roomId)
      this.roomId = router.getCurrentNavigation()?.extras.state?.roomId;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = params['id'];
      this.doctorService.getDoctor(parseInt(params['id'])).subscribe(
        data => {
          this.doctor = data;
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

}
