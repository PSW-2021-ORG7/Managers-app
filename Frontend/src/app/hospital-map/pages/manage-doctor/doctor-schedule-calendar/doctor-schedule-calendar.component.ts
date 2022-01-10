import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarEvent } from '@app/hospital-map/models/calendar/calendar-event.model';
import { Holiday } from '@app/hospital-map/models/shift/holiday.model';
import { OnCallShift } from '@app/hospital-map/models/shift/on-call-shift.model';
import { Shift } from '@app/hospital-map/models/shift/shift.model';
import { ShiftService } from '@app/hospital-map/shared/services/shift.service';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-doctor-schedule-calendar',
  templateUrl: './doctor-schedule-calendar.component.html',
  styleUrls: ['./doctor-schedule-calendar.component.scss']
})
export class DoctorScheduleCalendarComponent implements OnInit, OnChanges {

  @Input() shifts: Shift[] = [];
  @Input() onCallShifts    : OnCallShift[] = [];
  @Input() holidays: Holiday[] = [];

  events : CalendarEvent[] = [];
  @ViewChild('doctorschedulecalendar') fullCalendar!: FullCalendarComponent;
  descriptionText: string="";
  selectedEventId: string="";
  showOptionalDialog: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private shiftService: ShiftService) { }

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


  ngOnInit(): void {
    const headEl = this.document.getElementsByTagName('head')[0];
    const newLinkEl = this.document.createElement('link');
    newLinkEl.id = 'custom-calendar';
    newLinkEl.rel = "stylesheet";
    newLinkEl.href = 'custom-calendar.css';

    headEl.appendChild(newLinkEl);
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['shifts']) {
      this.shifts = changes.shifts.currentValue;
      this.filterShifts();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
  
    if(changes['onCallShifts']){
      this.onCallShifts = changes.onCallShifts.currentValue;
      this.filterOnCallShifts();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }

    if(changes['holidays']){
      this.holidays = changes.holidays.currentValue;
      this.filterHolidays();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
  }



  private filterShifts() : void {
    for(let shift of this.shifts){
      this.events.push(
        new CalendarEvent(
          shift.id!.toString() + "shift",
          shift.name,
          shift.start,
          shift.end,
          "#66A182"
        )
      );
    }
  }

  private filterOnCallShifts() : void {
    for(let shift of this.shifts){
      this.events.push(
        new CalendarEvent(
          shift.id!.toString() + "OnCallShift",
          shift.name,
          shift.start,
          shift.end,
          "#ffc700"
        )
      );
    }
  }

  private filterHolidays() : void {
    for(let holiday of this.holidays){
      this.events.push(
        new CalendarEvent(
          holiday.id!.toString() + "holiday",
          "Holiday ",
          holiday.start,
          holiday.end,
          "#6F10CE"
        )
      );
    }
  }







  




}
