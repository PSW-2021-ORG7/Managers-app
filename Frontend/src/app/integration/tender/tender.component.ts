import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class TenderRequestItem {
  constructor(
    public Id: number,
    public MedicienName: string,
    public DosageInMilligrams: number,
    public Manufacturer: string,
    public RequiredQuantity: number,
  ) { }
}

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {
  medicine: string = '';
  dose: string = '';
  quantity: string = '';
  manufacturer: string = '';
  date: string = '';
  disableFields: boolean = true;
  
  showItemEditRemoveButtons: boolean = false;
  selectedItemId: string = "";
  deletedItemsCount: number = 0;

  tenderRequest: TenderRequestItem[] = [];
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

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

  selectChangeHandlerManufacturer(event: any) {
    this.manufacturer = event.target.value;
    console.log(this.manufacturer);
  }

  selectChangeHandlerDate(event: any) {
    this.date = event.target.value;
    console.log(this.quantity);
  }

  selectChangeHandlerSelectedItem(event: any) {
    this.selectedItemId = event.target.value;
    this.showItemEditRemoveButtons = true
    this.setFields(this.selectedItemId)
    
  }

  addItem(): void {
    var tender = {
      Id: this.tenderRequest.length + this.deletedItemsCount + 1,
      MedicienName: this.medicine,
      DosageInMilligrams: +this.dose,
      Manufacturer: this.manufacturer,
      RequiredQuantity: +this.quantity     
    };

    if(this.validate()) 
    {
        if(this.checkEqual(tender)) alert("Item already exists on the list!")
        else this.tenderRequest.push(tender);             
    }    
  }

  checkEqual(tender: TenderRequestItem): boolean{

    var ret = false;

    this.tenderRequest.forEach(function(item){
      if(tender.MedicienName == item.MedicienName && tender.DosageInMilligrams == item.DosageInMilligrams
        && tender.Manufacturer == item.Manufacturer){
          ret = true;
        }
    })
    return ret;
  }

  removeItem(): void {
    
    this.tenderRequest.forEach((item, index) => {
      if(+this.selectedItemId == item.Id){
        this.tenderRequest.splice(index, 1)    
        this.deletedItemsCount++
        alert("Successfully deleted item!")    
      }
        
  });
  }

  updateItem(): void {

    var tender = {
      Id: +this.selectedItemId,
      MedicienName: this.medicine,
      DosageInMilligrams: +this.dose,
      Manufacturer: this.manufacturer,
      RequiredQuantity: +this.quantity     
    };

    if(this.validate())
    {     
      this.tenderRequest.forEach((item, index) => {
        if(+this.selectedItemId == item.Id){
          this.tenderRequest.splice(index, 1, tender)
          alert("Successfully updated item!")    
        }          
    });     
    } 
  }

  cancelEdit(){
    this.selectedItemId = "";
    this.medicine = ""
    this. dose = "",
    this.quantity = "",
    this.manufacturer = "",
    this.showItemEditRemoveButtons = false
  }

  setFields(id: string): void{

    this.tenderRequest.forEach((item, index) => {
      if(+id == item.Id){
        this.medicine = item.MedicienName
        this.dose = item.DosageInMilligrams.toString()
        this.quantity = item.RequiredQuantity.toString()
        this.manufacturer = item.Manufacturer  
      }
        
  });     
      
  }

  validate(): boolean{
    var ret = true;

    if(this.medicine == "" || this.dose == "" || this.quantity == "" || this.manufacturer == ""){
      alert("Please fill all fields!")
      ret = false
    }

    if(this.dose.match(/^[0-9]+$/) == null){
      alert("Dose can only be a number!")
      ret = false
    }

    if(this.quantity.match(/^[0-9]+$/) == null){
      alert("Quantity can only be a number!")
      ret = false
    }
    return ret
  }
}
