export class Pharmacy{
   
    idPharmacy: string;
    namePharmacy: string;
    apiKey: string;
    endpoint: string;

    constructor(idPharmacy: string, namePharmacy: string, apiKey: string, endpoint: string){
        this.idPharmacy = idPharmacy;
        this.namePharmacy = namePharmacy;
        this.apiKey = apiKey;
        this.endpoint = endpoint;
    }
}