import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class TenderOffer {
  constructor(
    public tenderOfferItems: TenderOfferItems[],
    public priceForAllAvailable: string,
    public priceForAllRequired: string,    
    public totalNumberMissingMedicine: string,
  ){}
}

export class TenderOfferItems {
  constructor(
    public medicineName: string,
    public medicineDosage: number,
    public availableQuantity: number,
    public missingQuantity: number,
    public priceForSingleEntity: number
  ){}
}

export class Tender {
  constructor(
    public idTender: number,
    public tenderKey: string,
    public isActive: boolean,
    public startDate: Date,
    public endDate: Date,
    public idWinnerPharmacy: number
  ){}
}

@Component({
  selector: 'app-view-tenders',
  templateUrl: './view-tenders.component.html',
  styleUrls: ['./view-tenders.component.scss'],
})

export class ViewTendersComponent implements OnInit {

  selectedTenderId: string = ""
  tenders: Tender[] = []

  medicineName: string = ""
  dosageInMilligrams: number = 0
  availableQuantity: number = 0
  missingQuantity: number = 0
  priceForSingleEntity: number = 0 

  tenderOfferItems: TenderOfferItems[] = []
  priceForAllAvailable: string = "" 
  priceForAllRequired: string = "" 
  totalNumberMissingMedicine: string = ""

  tenderOffers: TenderOffer[] = []

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  selectChangeHandlerId(event: any) {
    this.selectedTenderId = event.target.value;
    console.log(this.selectedTenderId)

  }

  viewOffers(): void{
    var tenderOfferItems = {
      medicineName: this.medicineName,
      dosageInMilligrams: this.dosageInMilligrams,
      availableQuantity: this.availableQuantity,
      missingQuantity: this.missingQuantity,
      priceForSingleEntity: this.priceForSingleEntity,
    };

    var tenderOffer = {
      tenderOfferItems: this.tenderOfferItems,
      priceForAllAvailable : this.priceForAllAvailable,
      priceForAllRequired: this.priceForAllRequired,
    };

  }
  
  acceptOffer(): void {

    var tenderOfferItems = {
      medicineName: this.medicineName,
      dosageInMilligrams: this.dosageInMilligrams,
      availableQuantity: this.availableQuantity,
      missingQuantity: this.missingQuantity,
      priceForSingleEntity: this.priceForSingleEntity,
    };

    var tenderOffer = {
      tenderOfferItems: this.tenderOfferItems,
      priceForAllAvailable : this.priceForAllAvailable,
      priceForAllRequired: this.priceForAllRequired,
    };

  }


}
