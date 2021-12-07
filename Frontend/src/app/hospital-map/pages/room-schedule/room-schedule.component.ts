import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-room-schedule',
  templateUrl: './room-schedule.component.html',
  styleUrls: ['./room-schedule.component.scss']
})
export class RoomScheduleComponent {

  constructor(private router: Router) { }

  onBackToRoomDetails(): void{
    this.router.navigate(['/hospital-map/'])
  }
  
}
