import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenderViewService } from './view-tenders.service';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';

export class TenderOffer {
  constructor(
    public idTenderOffer: number,
    public idPharmacy: string,
    public pharmacy: string,
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
    public id: number,
    public tenderKey: string,
    public isActive: boolean,
    public startDate: Date,
    public endDate: Date,
    public idWinnerPharmacy: number
  ){}
}

export class Pharmacy {
  constructor(
    public namePharmacy: string,
    public address: string,
    public city: string
  ) { }
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
  
  selectedTenderStartDate: string = ""
  selectedTenderEndDate: string = ""

  constructor(private tenderViewService: TenderViewService, private pharmacyService: MedicationSpecificationService) { }

  ngOnInit(): void {

    this.tenderViewService.getAllActiveTenders("ABC").subscribe((tenders: Tender[]) => {
      console.log(tenders)
      this.tenders = tenders
    });

  }

  selectChangeHandlerId(event: any) {
    this.selectedTenderId = event.target.value;
    console.log(this.selectedTenderId)

  }

  viewOffers(): void{
    
    this.tenderViewService.getTenderById(this.selectedTenderId, "ABC").subscribe((tender: Tender) => {
      console.log(tender);
      this.selectedTenderStartDate = tender.startDate.toString();
      this.selectedTenderEndDate = tender.endDate.toString();
      
      this.tenderViewService.getAllOffersByTenderId(this.selectedTenderId, "ABC").subscribe((tenderOffers: TenderOffer[]) => {
        this.tenderOffers = tenderOffers;
  
        this.tenderOffers.forEach((item, index) => {
          this.pharmacyService.getPharmacyByID(item.idPharmacy).subscribe((pharmacy: Pharmacy) => {
            item.pharmacy = pharmacy.namePharmacy + " in " + pharmacy.city;
          });
      });
  
      });
    });
  }

  closeTender(){
    //TO DO:
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
