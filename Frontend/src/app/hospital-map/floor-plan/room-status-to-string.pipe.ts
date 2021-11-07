import { Pipe, PipeTransform } from '@angular/core';
import { RoomStatus } from '../models/rooms/room.model';

@Pipe({
  name: 'roomStatusToString'
})
export class RoomStatusToStringPipe implements PipeTransform {

  transform(value: RoomStatus): string {
    if(value == RoomStatus.Occupied){
      return 'Occupied';
    }
    else if(value == RoomStatus.Unoccupied){
      return 'Unoccupied';
    }
    else if(value == RoomStatus.IsBeingRenovated){
      return 'Is being renovated';
    }
    else if(value == RoomStatus.NotActive){
      return 'Not active';
    }

    return '';
  }

}
