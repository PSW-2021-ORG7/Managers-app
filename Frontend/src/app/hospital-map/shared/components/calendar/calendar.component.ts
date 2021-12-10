import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import {DOCUMENT} from '@angular/common'
import { EquipmentTransfer } from 'src/app/hospital-map/models/equipment/equipment-transfer.model';
import { EquipmentTransferService } from '../../services/equipment-tranfser.service';
import { CalendarEvent } from 'src/app/hospital-map/models/calendar/calendar-event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges{

  @Input() equipmentTransfers: EquipmentTransfer[] = [];
  filteredTransfers : CalendarEvent[] = [];
  @ViewChild('roomschedulecalendar') fullCalendar! : FullCalendarComponent;

  constructor(@Inject(DOCUMENT) private document: Document, private equipmentTransferService: EquipmentTransferService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: true,
    height: '97%',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: false,
    selectable: true,
    allDaySlot: false,
    events: (fetchInfo, sucessCallback, failureCallback) => {
      sucessCallback(this.filteredTransfers);
    },
    eventColor: '#214975'
  };

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['equipmentTransfers']) {
      this.equipmentTransfers = changes.equipmentTransfers.currentValue;
      this.filterTransfers();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
  }

  private filterTransfers() : void {
    this.filteredTransfers = [];
    for(let transfer of this.equipmentTransfers){
      this.filteredTransfers.push(
        new CalendarEvent(
          "Transfer " + transfer.sourceRoomId + " -> " + transfer.destinationRoomId,
          transfer.transferDate,
          new Date(new Date(transfer.transferDate).getTime() + transfer.transferDuration*60000)
        )
      );
    }
  }

  // full calendar component will only be available after rendering
  ngAfterViewInit() {
    this.fullCalendar.getApi().refetchEvents();
  }

}
