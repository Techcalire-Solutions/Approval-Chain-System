import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformaInvoice } from './models/performa-invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url = environment.apiUrl;

  constructor(private _http:HttpClient) { }

  uploadInvoice(file: any): Observable<any> {
    if (file instanceof File) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      return this._http.post(this.url + '/invoice/fileupload', formData);
    } else {
      // Handle the case where 'file' is not a File object
      return throwError("Invalid file type");
    }
  }

  deleteInvoice(fileName: string){
    return this._http.delete(this.url + '/invoice/filedelete' + fileName);
  }

  getPI(status?: string): Observable<PerformaInvoice[]>{
    return this._http.get<PerformaInvoice[]>(this.url + `/performaInvoice/find/?status=${status}`);
  }

  addPI(data: any){
    return this._http.post(this.url + '/performaInvoice/save', data);
  }

  getPIById(id: number): Observable<PerformaInvoice>{
    return this._http.get<PerformaInvoice>(this.url + '/performaInvoice/findbyid/'+id);
  }

  updatePIStatus(data: any){
    return this._http.post(this.url + '/invoiceStatus/updatestatus', data);
  }

  updatePIStatusWithBankSlip(data: any){
    return this._http.post(this.url + '/invoiceStatus/updatestatustobankslip', data);
  }

  addBankSlip(data: any, id: number){
    return this._http.patch(this.url + '/performaInvoice/bankslip/' + id, data);
  }
}
