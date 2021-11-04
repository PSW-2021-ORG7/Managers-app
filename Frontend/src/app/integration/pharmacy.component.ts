import { Component, OnInit } from '@angular/core';
import { PharmacyService } from './pharmacy.service';

@Component({
  selector: 'app-integration',/**promeniti na pharmacy */
  templateUrl: './integration.component.html',/**promeniti na pharmacy */
  styleUrls: ['./integration.component.css'],/**promeniti na pharmacy */
  providers: [PharmacyService]
})
export class PharmacyComponent implements OnInit {
  pharmacy = { name: ''};/**dodati sta jos treba */

  constructor(private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
    
    this.pharmacyService.getPharmacies()
      .subscribe(
        data => {
          this.aplyPharmacyData(this.pharmacy, data[0]);
        });
  }

  private aplyPharmacyData(phar: any, data: any) {
    phar.name = data.name;
  }

}
