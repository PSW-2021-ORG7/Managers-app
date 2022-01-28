import { DatePipe } from '@angular/common';
import { Component} from '@angular/core';
import { TenderService } from './tender.service';
import Swal from 'sweetalert2'

export class TenderRequestItem {
  constructor(
    public Id: number,
    public MedicineName: string,
    public DosageInMilligrams: number,
    public RequiredQuantity: number,
  ) { }
}

export class TenderRequest {
  constructor(
    public requestedItems: TenderRequestItem[] 
  ) { }
}

export class Tender {
  constructor(
    public tenderKey: string
  ) { }
}

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent {
  medicine: string = '';
  dose: string = '';
  quantity: string = '';
  date: Date = new Date();
  disableFields: boolean = true;
  
  showItemEditRemoveButtons: boolean = false;
  selectedItemId: string = "";
  deletedItemsCount: number = 0;

  requestedItems: TenderRequestItem[] = [];
  
  constructor(private datePipe: DatePipe, private tenderService: TenderService) { }

  selectChangeHandlerMedicine(event: any) {
    this.medicine = event.target.value;
    console.log(this.medicine);
  }

  selectChangeHandlerDose(event: any) {
    this.dose = event.target.value;
    console.log(this.dose);
  }

  selectChangeHandlerQuantity(event: any) {
    this.quantity = event.target.value;
    console.log(this.quantity);
  }

  selectChangeHandlerDate(event: any) {
    this.date = event.target.value;
    console.log(this.date);
  }

  selectChangeHandlerSelectedItem(event: any) {
    this.selectedItemId = event.target.value;
    this.showItemEditRemoveButtons = true
    this.setFields(this.selectedItemId)
    
  }

  addItem(): void {
    var tender = {
      Id: this.requestedItems.length + this.deletedItemsCount + 1,
      MedicineName: this.medicine,
      DosageInMilligrams: +this.dose,
      RequiredQuantity: +this.quantity     
    };

    if(this.validate()) 
    {
        if(this.checkEqual(tender)) Swal.fire({text: 'Item already exists on the list', icon: 'warning'})
        else this.requestedItems.push(tender);             
    }    
  }

  checkEqual(tender: TenderRequestItem): boolean{

    var ret = false;

    this.requestedItems.forEach(function(item){
      if(tender.MedicineName == item.MedicineName && tender.DosageInMilligrams == item.DosageInMilligrams)
      {
          ret = true;
      }
    })
    return ret;
  }

  removeItem(): void {
    
    this.requestedItems.forEach((item, index) => {
      if(+this.selectedItemId == item.Id){
        this.requestedItems.splice(index, 1)    
        this.deletedItemsCount++
        //Swal.fire("Successfully deleted item")    
      }
        
  });
  }

  updateItem(): void {

    var tender = {
      Id: +this.selectedItemId,
      MedicineName: this.medicine,
      DosageInMilligrams: +this.dose,
      RequiredQuantity: +this.quantity     
    };

    if(this.validate())
    {     
      this.requestedItems.forEach((item, index) => {
        if(+this.selectedItemId == item.Id){
          this.requestedItems.splice(index, 1, tender)
          //Swal.fire("Successfully updated item")    
        }          
    });     
    } 
  }

  cancelEdit(){
    this.selectedItemId = ""
    this.medicine = ""
    this. dose = ""
    this.quantity = ""
    this.showItemEditRemoveButtons = false
  }

  setFields(id: string): void{

    this.requestedItems.forEach((item, index) => {
      if(+id == item.Id){
        this.medicine = item.MedicineName
        this.dose = item.DosageInMilligrams.toString()
        this.quantity = item.RequiredQuantity.toString() 
      }
        
  });      
  }

  openTender(): void{
    if(this.requestedItems.length == 0) alert ("No items were added!")
    else if(this.date < new Date()){
      Swal.fire({text: 'Invalid date!', icon: 'warning'})    
    }
    else{   
      var sendTender = {
        IsActive: true,
        IdWinnerPharmacy: 0,
        StartDate: this.datePipe.transform(new Date(), "dd/MM/yyyy")?.toString(),
        EndDate: this.datePipe.transform(this.date, "dd/MM/yyyy")?.toString()
      }
      console.log(sendTender);
      this.tenderService.openTender(sendTender, "ABC").subscribe((tender: Tender) => {
        
        var tenderRequest = {
          requestedItems: this.requestedItems ,
          TenderKey: tender.tenderKey
        }
        
        console.log(tenderRequest)
        this.tenderService.sendTenderRequest(tenderRequest, "ABC").subscribe(response => {
          Swal.fire({title: 'Successfully opened tender and delivered request', icon: 'success'}).then(function(){window.location.reload()})   
        }, error => Swal.fire({title: 'Error trying to send requests', text: 'Error: Failed to connect to RabbitMQ server', icon: 'error'}))    
      });    
    }
  }

  validate(): boolean{
    var ret = true;

    if(this.medicine == "" || this.dose == "" || this.quantity == ""){
      Swal.fire({text: 'Please fill all fields!', icon: 'warning'})    
      ret = false
    }

    if(this.dose.match(/^\d+$/) == null){
      Swal.fire({text: 'Dose can only be a number!', icon: 'warning'})    
      ret = false
    }

    if(this.quantity.match(/^\d+$/) == null){
      Swal.fire({text: 'Quantity can only be a number!', icon: 'warning'}) 
      ret = false
    }
    return ret
  }
}
