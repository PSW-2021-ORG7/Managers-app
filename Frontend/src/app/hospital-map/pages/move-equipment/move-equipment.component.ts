import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-move-equipment',
  templateUrl: './move-equipment.component.html',
  styleUrls: ['./move-equipment.component.scss']
})
export class MoveEquipmentComponent {
  
  mode: string = "move-equipment";

  constructor(private router: Router) { }
  
  onBackToMap(): void{
    this.router.navigate(['/hospital-map/'])
  }
  
}