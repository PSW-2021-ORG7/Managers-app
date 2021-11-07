import { Pipe, PipeTransform } from '@angular/core';
import { RoomType } from '../models/rooms/room.model';

@Pipe({
  name: 'roomTypeToString'
})
export class RoomTypeToStringPipe implements PipeTransform {

  transform(value: RoomType): string {
    if(value == RoomType.OperatingRoom){
       return 'Operating room';
    }
    else if(value == RoomType.SurgeryRoom){
      return 'Surgery room';
    }
    else if(value == RoomType.ExaminationRoom){
      return 'Examination room';
    }
    else if(value == RoomType.EmergencyRoom){
      return 'Emergency room';
    }
    else if (value == RoomType.DoctorOffice){
      return 'Doctor office';
    }
    else if(value == RoomType.Restroom){
      return 'Restroom';
    }
    else if(value == RoomType.Lift){
      return 'Lift';
    }
    else if(value == RoomType.Stairs){
      return 'Stairs';
    }
    else if(value == RoomType.Storage){
      return 'Storage';
    }
    
    return '';
  }

}
