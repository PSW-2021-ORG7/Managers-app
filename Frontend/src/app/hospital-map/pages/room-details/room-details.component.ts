import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/rooms/room.model';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  room!: Room;

  constructor(private roomsService: RoomsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let roomId = params['id'];
      
      this.roomsService.getRoomWithEquipment(roomId).subscribe(
        data => {
          this.room = data;
          console.log(this.room);
      })
    })
  }

}
