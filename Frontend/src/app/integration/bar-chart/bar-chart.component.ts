import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TenderViewService } from '../view-tenders/view-tenders.service';

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

export class TenderOffer {
  constructor(
    public idTenderOffer: number,
    public idPharmacy: string,
    public pharmacy: string,
    public priceForAllAvailable: string,
    public priceForAllRequired: string,
  ) { }
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.55)',
    },
  ];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Price Available' },
    { data: [], label: 'Price Required' },
    { data: [], label: 'Price Available (Won Tender)' }
  ];

  selectedPharmacyId: string = ''
  tenders: Tender[] = []
  tenderOffers: TenderOffer[] = []
  winsCounter: number = 0

  constructor(private tenderService: TenderViewService) { }

  ngOnInit(): void {
    this.selectedPharmacyId = JSON.parse(localStorage.getItem("selectedPharmacyId") || '')
    console.log("Chart selected pharmacy: " + this.selectedPharmacyId)

    this.tenderService.getAllTenders().subscribe((tenders: Tender[]) => {
      this.tenders = tenders
      console.log(tenders)
      this.getNumberOfWins()
      console.log("Number of wins: " + this.winsCounter)
      this.insertData()
    })
  }

  getNumberOfWins(): void{
    
    this.tenders.forEach((tender) => {
      if(tender.idWinnerPharmacy == +this.selectedPharmacyId){
        console.log("found")
        this.winsCounter++
      }
        
    })
  }

  insertData(): void{
    this.tenders.forEach((tender) => {
      this.tenderService.getAllOffersByTenderId(tender.id.toString(), "ABC").subscribe((offers: TenderOffer[]) => {

        offers.forEach((offer) => {       
          if(offer.idPharmacy == this.selectedPharmacyId){
            this.barChartLabels.push("Tender ID: " + tender.id) 
            this.barChartData[1].data?.push(+offer.priceForAllRequired)

              if(+offer.idPharmacy == tender.idWinnerPharmacy){
                this.barChartData[2].data?.push(+offer.priceForAllAvailable)
                this.barChartData[0].data?.push(0)
              }              
              else{
                this.barChartData[0].data?.push(+offer.priceForAllAvailable)
                this.barChartData[2].data?.push(0)
              }
            
          }
        })
      })

    })

    console.log(this.barChartLabels)
    
  }
}
