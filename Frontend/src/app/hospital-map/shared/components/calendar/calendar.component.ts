import { Component, Inject, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {DOCUMENT} from '@angular/common'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: true,
    height: '97%',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay',
    },
    editable: false,
    selectable: true,
    allDaySlot: false,
    events: [
      { title: 'Appointment #1', date: '2021-12-06T08:30:00' },
      { title: 'Appointment #2', date: '2021-12-06T12:30:00' },
      { title: 'Appointment #3', date: '2021-12-07T13:30:00' },
      { title: 'Appointment #4', date: '2021-12-07T17:30:00' },
      { title: 'Rellocation #334', date: '2021-12-07T18:30:00', color: '#66A182' }
    ],
    eventColor: '#214975'
  };

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    const headEl = this.document.getElementsByTagName('head')[0];

    const existingLinkEl = this.document.getElementById('custom-calendar') as HTMLLinkElement;
    if(existingLinkEl){
      existingLinkEl.href = 'custom-calendar.css';
    } else {
      const newLinkEl = this.document.createElement('link');
      newLinkEl.id = 'custom-calendar';
      newLinkEl.rel = "stylesheet";
      newLinkEl.href = 'custom-calendar.css';
  
      headEl.appendChild(newLinkEl);
    }
  }

}
