import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import {DOCUMENT} from '@angular/common'
import { EquipmentTransfer } from 'src/app/hospital-map/models/equipment/equipment-transfer.model';
import { EquipmentTransferService } from '../../services/equipment-tranfser.service';
import { CalendarEvent } from 'src/app/hospital-map/models/calendar/calendar-event.model';
import { SplitRenovation } from '@app/hospital-map/models/renovations/split-renovation.model';
import { MergeRenovation } from '@app/hospital-map/models/renovations/merge-renovation.model';
import { RoomTypeToStringPipe } from '../../pipes/room-type-to-string.pipe';
import { RoomType } from '@app/hospital-map/models/rooms/room.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges{

  @Input() equipmentTransfers: EquipmentTransfer[] = [];
  @Input() splitRenovations: SplitRenovation[] = [];
  @Input() mergeRenovations: MergeRenovation[] = [];
  events : CalendarEvent[] = [];
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
      sucessCallback(this.events);
    },
    eventBorderColor : "#ffffff",
    expandRows: true,
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
    if(changes['splitRenovations']){
      this.splitRenovations = changes.splitRenovations.currentValue;
      this.filterSplitRenovations();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
    if(changes['mergeRenovations']){
      this.mergeRenovations = changes.mergeRenovations.currentValue;
      this.filterMergeRenovations();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
  }

  private filterMergeRenovations() : void {
    for(let renovation of this.mergeRenovations){
      this.events.push(
        new CalendarEvent(
          "Merge of rooms " + renovation.firstOldRoomId + " & " + renovation.secondOldRoomId,
          renovation.start,
          renovation.end,
          "#623FC8"
        )
      );
    }
  }

  private filterSplitRenovations() : void {
    for(let renovation of this.splitRenovations){
      this.events.push(
        new CalendarEvent(
          "Split of room " + renovation.roomId,
          renovation.start,
          renovation.end,
          "#66A182"
        )
      );
    }
  }

  private filterTransfers() : void {
    for(let transfer of this.equipmentTransfers){
      const roomTypePipe = new RoomTypeToStringPipe();
      let sourceRoomText =  roomTypePipe.transform(transfer.sourceRoomType) + " " + transfer.sourceRoomName;
      if(transfer.sourceRoomType == RoomType.Restroom)
      sourceRoomText = transfer.sourceRoomName + " " + "WC";
      let destinationRoomText =  roomTypePipe.transform(transfer.destinationRoomType) + " " + transfer.destinationRoomName;
      if(transfer.destinationRoomType == RoomType.Restroom)
      destinationRoomText = transfer.destinationRoomName + " " + "WC";
      this.events.push(
        new CalendarEvent(
          "Transfer: " + sourceRoomText + " -> " + destinationRoomText,
          transfer.transferDate,
          new Date(new Date(transfer.transferDate).getTime() + transfer.transferDuration*60000),
          "#214975"
        )
      );
    }
  }

  // full calendar component will only be available after rendering
  ngAfterViewInit() {
    this.fullCalendar.getApi().refetchEvents();
  }

}
