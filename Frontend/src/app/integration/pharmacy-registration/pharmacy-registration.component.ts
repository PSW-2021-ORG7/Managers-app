import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class PharmacyRegistration{
  constructor(
    public namePharmacy : string,
    public apiKeyPharmacy : string,
    public endpoint : string
  ) {

  }
}

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.scss']
})
export class PharmacyRegistrationComponent implements OnInit {

  namePharmacy: string = '';
  apiKeyPharmacy: string = '';
  endpoint: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  selectChangeHandlerName (event: any){
    this.namePharmacy = event.target.value;
    console.log(this.namePharmacy);
  }

  selectChangeHandlerApiKey (event: any){
    this.apiKeyPharmacy = event.target.value;
    console.log(this.apiKeyPharmacy);
  }

  selectChangeHandlerEndpoint (event: any){
    this.endpoint = event.target.value;
    console.log(this.endpoint);
  }

  send() : void {

    var registration = {
      namePharmacy: this.namePharmacy,
      apiKeyPharmacy: this.apiKeyPharmacy,
      endpoint: this.endpoint};
      
      console.log(registration);

  }

}
