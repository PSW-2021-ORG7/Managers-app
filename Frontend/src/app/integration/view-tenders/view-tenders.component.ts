import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenderViewService } from './view-tenders.service';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
import { DatePipe } from '@angular/common';

export class TenderOffer {
  constructor(
    public idTenderOffer: number,
    public idPharmacy: string,
    public pharmacy: string,
    public tenderOfferItems: TenderOfferItems[],
    public priceForAllAvailable: string,
    public priceForAllRequired: string,
    public totalNumberMissingMedicine: string,
  ) { }
}

export class TenderOfferItems {
  constructor(
    public medicineName: string,
    public medicineDosage: number,
    public availableQuantity: number,
    public missingQuantity: number,
    public priceForSingleEntity: number
  ) { }
}

export class Tender {
  constructor(
    public id: number,
    public tenderKey: string,
    public isActive: boolean,
    public startDate: Date,
    public endDate: Date,
    public idWinnerPharmacy: number
  ) { }
}

export class Pharmacy {
  constructor(
    public idPharmacy: number,
    public namePharmacy: string,
    public address: string,
    public city: string,
    public apiKeyPharmacy: string,
    public endpoint: string
  ) { }
}

@Component({
  selector: 'app-view-tenders',
  templateUrl: './view-tenders.component.html',
  styleUrls: ['./view-tenders.component.scss'],
})

export class ViewTendersComponent implements OnInit {
  showTenderInfo: boolean = false;

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

  selectedTenderStartDate: Date = new Date()
  selectedTenderEndDate: Date = new Date()

  constructor(private datePipe: DatePipe, private tenderViewService: TenderViewService, private pharmacyService: MedicationSpecificationService) { }

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

  viewOffers(): void {
    this.showTenderInfo = true;
    this.tenderViewService.getTenderById(this.selectedTenderId, "ABC").subscribe((tender: Tender) => {
      console.log(tender);
      this.selectedTenderStartDate = tender.startDate;
      this.selectedTenderEndDate = tender.endDate;

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

  closeTender() {
    //TO DO:
  }

  acceptOffer(id: number): void {

    var idWinnerPharmacy = 0;
    this.tenderOffers.forEach((item) => {
      if (item.idTenderOffer == id)
        idWinnerPharmacy = +item.idPharmacy
    });

    this.informPharmacies(idWinnerPharmacy)

    this.tenderViewService.setWinner(+this.selectedTenderId, idWinnerPharmacy, "ABC").subscribe(response => {
      if (response) alert("Successfully set winner!")
    });
  }

  informPharmacies(idWinnerPharmacy: number): void {

    this.tenderOffers.forEach((item) => {
      this.pharmacyService.getPharmacyByID(item.idPharmacy).subscribe((pharmacy: Pharmacy) => {
        console.log(pharmacy)
        var pharmacyLocation = item.pharmacy = pharmacy.namePharmacy + " in " + pharmacy.city;
        if (pharmacy.idPharmacy != idWinnerPharmacy) {
          var message = "We are sorry to inform you that you did not win Tender with ID: " + this.selectedTenderId
            + " ( " + pharmacyLocation + " )";
          //this.tenderViewService.sendMessage(message, pharmacy.endpoint, pharmacy.apiKeyPharmacy).subscribe();
        }
        else {
          var message = "Congratulations! You won Tender with ID: " + this.selectedTenderId
            + " ( " + pharmacyLocation + " )";
          this.tenderViewService.sendMessage(message, pharmacy.endpoint, pharmacy.apiKeyPharmacy).subscribe();
        }
        console.log(message);
      });

    });

  }


}
