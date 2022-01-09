import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CalendarEvent } from '@app/hospital-map/models/calendar/calendar-event.model';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-doctor-schedule-calendar',
  templateUrl: './doctor-schedule-calendar.component.html',
  styleUrls: ['./doctor-schedule-calendar.component.scss']
})
export class DoctorScheduleCalendarComponent implements OnInit {

  events : CalendarEvent[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    height: '79.5vh',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek',
    },
    editable: false,
    selectable: true,
    allDaySlot: false,
    events: (fetchInfo, sucessCallback, failureCallback) => {
      sucessCallback(this.events);
    },
    eventBorderColor : "#ffffff",
    expandRows: true,
    // eventClick:(info)=>{
    //   if(info.event.start != null){
    //     var eventStartTime = new Date(info.event.start);
    //     var range = eventStartTime.valueOf() - Date.now().valueOf();
    //     console.log(info.event.start);
    //     console.log(eventStartTime);
    //     console.log(eventStartTime.valueOf());
    //     console.log(range);
    //     if(range >= 24*60*60*1000){
    //       this.descriptionText = info.event.title
    //       this.showOptionalDialog = true;
    //       this.selectedEventId = info.event.id;
    //    }
    //   }
      // }
  };

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    const headEl = this.document.getElementsByTagName('head')[0];
    const newLinkEl = this.document.createElement('link');
    newLinkEl.id = 'custom-calendar';
    newLinkEl.rel = "stylesheet";
    newLinkEl.href = 'custom-calendar.css';

    headEl.appendChild(newLinkEl);
  }

}
