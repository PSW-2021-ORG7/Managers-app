import { Component, OnInit } from '@angular/core';
import { PharmacyService } from './pharmacy-registration.service';

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.css'],
  providers: [PharmacyService]
})
export class PharmacyRegistrationComponent implements OnInit {
 
  public namep : string = "";
  public akey : string = "";
  public endp : string = "";
  public idp : string = "1234";
  
  constructor(private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
    
  }
  
  public createPharmacy(){
   // pharmacy = { idPharmacy: idp, namePharmacy: namep, apiKey: akey, endpoint: endp};
    this.pharmacyService.createNewPharmacy(this.pharmacy)
      .subscribe(
        data => {
          
        });
  }

}
