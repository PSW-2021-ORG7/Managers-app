import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '@app/hospital-map/models/doctor/doctor.model';
import { Shift } from '@app/hospital-map/models/shift/shift.model';
import { DoctorService } from '@app/hospital-map/shared/services/doctor.service';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doctor-workload',
  templateUrl: './doctor-workload.component.html',
  styleUrls: ['./doctor-workload.component.scss']
})
export class DoctorWorkloadComponent implements OnInit {

  roomId!: string;
  doctorId!: number;
  doctor!: Doctor;
  currentDate: Date = new Date();

  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
  };
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  chartType: ChartType = "line";
  chartLegend = false;
  chartData = [
    {data: Array<any>(), label: 'Regular shifts', cubicInterpolationMode: 'monotone', borderColor: '#66A182'},
    {data: Array<any>(), label: 'On-call shifts', cubicInterpolationMode: 'monotone', borderColor: '#214975'}
  ];
  shifts: Shift[] = [];
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(private route: ActivatedRoute, private router: Router, private doctorService: DoctorService, private shiftService: ShiftService, private datepipe: DatePipe) { 
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
      var firstDateInYear = new Date(new Date().getFullYear(), 0, 1);
      var lastDateInYear = new Date(new Date().getFullYear(), 11, 31);
      this.shiftService.getShiftsInDateRange(this.datepipe.transform(firstDateInYear, 'yyyy-MM-dd')!, this.datepipe.transform(lastDateInYear, 'yyyy-MM-dd')!).subscribe(
        data => {
          this.shifts = data;
          this.filterShiftsForGraph();
          this.chart.update();
        }
      );
      // this.shiftService.getShiftsInDateRange(this.datepipe.transform(firstDateInYear, 'yyyy-MM-dd')!, this.datepipe.transform(lastDateInYear, 'yyyy-MM-dd')!).subscribe(
      //   data => {
      //     this.shifts = data;
      //   }
      // );
    });
  }

  filterShiftsForGraph() {
    for(let month = 0; month < 12; month++){
      var firstDateInMonth = new Date(new Date().getFullYear(), month, 1);
      var lastDateInMonth = new Date(new Date().getFullYear(), month+1, 0);
      var shiftWorkedCount = 0;
      for(let shift of this.shifts){
        if(new Date(shift.start) > firstDateInMonth && new Date(shift.end) < lastDateInMonth){
          shiftWorkedCount += 1;
        }
      }
      this.chartData[0].data.push(shiftWorkedCount);
      
    }
    
  }

  onBack(): void{
    if(this.roomId != "")
      this.router.navigate(['/hospital-map/rooms/' + this.roomId]);
    else
      this.router.navigate(['/hospital-map/'])
  }

}
