import { Component, OnInit } from '@angular/core';
import { PharmacyService } from './pharmacy-registration.service';

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.css'],
  providers: [PharmacyService]
})
export class PharmacyRegistrationComponent implements OnInit {
  pharmacy = { idPharmacy: '4433', namePharmacy: 'Pharmacy4433', apiKey: '4433AA21', endpoint: 'www.pharmacy4433.rs'};

  constructor(private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
    
  }
  
  public createPharmacy(){
    this.pharmacyService.createNewPharmacy(this.pharmacy)
      .subscribe(
        data => {
          
        });
  }

}
