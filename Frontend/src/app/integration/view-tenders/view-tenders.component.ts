import { Component, OnInit } from '@angular/core';
import { TenderViewService } from './view-tenders.service';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
import { UrgentRequestService } from '../urgent-request/urgent-request.service';
import Swal from 'sweetalert2'

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

export class Medicine {
  constructor(
    public Id: number
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

  constructor(private tenderViewService: TenderViewService, private pharmacyService: MedicationSpecificationService, private urgentRequestService: UrgentRequestService) { }

  ngOnInit(): void {

    this.tenderViewService.getAllActiveTenders("ABC").subscribe((tenders: Tender[]) => {
      console.log(tenders)
      this.tenders = tenders
    });

  }

  selectChangeHandlerId(event: any) {
    this.showTenderInfo = false;
    this.selectedTenderId = event.target.value;
    this.tenderOffers = [];
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
    this.tenderViewService.closeTender(+this.selectedTenderId).subscribe(response => {
        Swal.fire({text: 'Successfully closed tender', icon: 'success'}).then(function(){window.location.reload();})       
    }, error =>  Swal.fire({text: 'Failed to close tender', icon: 'error'}))
  }

  acceptOffer(idSelectedOffer: number): void {

    var idWinnerPharmacy = 0;
    this.tenderOffers.forEach((item) => {
      if (item.idTenderOffer == idSelectedOffer)
        idWinnerPharmacy = +item.idPharmacy
    });

    //Inform Pharmacy
    this.informPharmacies(idWinnerPharmacy)

    //Set Winner
    this.tenderViewService.setWinner(+this.selectedTenderId, idWinnerPharmacy, "ABC").subscribe(response => {
      if (response) {
        Swal.fire({title: 'Successfully set winner', text: 'The winner is pharmacy with ID: ' + idWinnerPharmacy, icon: 'success'})
        this.informPharmacies(idWinnerPharmacy);
      
      }
    });
 
    //Update Inventory
    this.updateInventories(idSelectedOffer);
  }

  informPharmacies(idWinnerPharmacy: number): void {

    this.tenderViewService.sendEmail(+this.selectedTenderId).subscribe(response => {
      Swal.fire({text: 'Successfully sent emails', icon: 'success'})
    }, error => Swal.fire({title: 'Failed to send emails', icon: 'error'}));
  }
  

  updateInventories(idSelectedOffer: number) {
    this.tenderOffers.forEach((offer) => {
      if (offer.idTenderOffer == idSelectedOffer) {
        offer.tenderOfferItems.forEach((item) => {

          this.pharmacyService.getPharmacyByID(offer.idPharmacy).subscribe((pharmacy: Pharmacy) => {
            this.pharmacyService.findMedicineByNameAndDose(item.medicineName, item.medicineDosage.toString(), pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe((med: Medicine) => {

              var inventoryUpdate = {
                medicineId: med.Id,
                quantity: item.availableQuantity
              };
              console.log(inventoryUpdate);

              this.urgentRequestService.updatePharmacyInventory(inventoryUpdate, inventoryUpdate.medicineId, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(pharmacyResponse => {
                if (pharmacyResponse) {
                  Swal.fire({title:'Successfully updated pharmacy inventory', icon:'success'})
                  this.updateHospitalInventory(med, pharmacy, item.availableQuantity);                
                }
                else Swal.fire({title: 'Failed to update pharmacy inventory', icon: 'error'})
              }, error => {Swal.fire({title: 'Failed to update pharmacy inventory', text: 'Pharmacy server might be down', icon: 'error'})});
            })
          })

        })
      }
    });
  }

  updateHospitalInventory(med: Medicine, pharmacy: Pharmacy, quantity: number){
    
    this.urgentRequestService.UpdateHospitalInventory(med, quantity, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(hospitalResponse => {
      if (hospitalResponse) {
        Swal.fire({title:'Successfully updated hospital inventory', icon:'success'}).then(function(){window.location.reload()})       
      }
      else Swal.fire({title: 'Failed to update hospital inventory', icon: 'error'})
    }, error => {Swal.fire({title: 'Failed to update pharmacy inventory', text: 'Pharmacy server might be down', icon: 'error'})});
  }

}
