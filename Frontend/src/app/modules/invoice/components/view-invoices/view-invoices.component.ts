import { Component, ViewChild } from '@angular/core';
import { InvoiceService } from '../../invoice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PerformaInvoice } from '../../models/performa-invoice';
import { Subscription } from 'rxjs';
import { DeleteComponent } from 'src/app/modules/login/components/delete/delete.component';
import { environment } from 'src/environments/environment';
import { VerficationDialogeComponent } from '../verfication-dialoge/verfication-dialoge.component';
import { AttachBankSlipComponent } from '../attach-bank-slip/attach-bank-slip.component';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.scss']
})

export class ViewInvoicesComponent {
  url = environment.apiUrl;
  ngOnDestroy(): void {
    this.invoiceSubscriptions?.unsubscribe();
  }

  constructor(private invoiceService: InvoiceService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getInvoices();
  }

  isImageEnlarged: boolean[] = [];
  enlargeImage(index: number, isEnlarged: boolean): void {
    this.isImageEnlarged[index] = isEnlarged;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  filterValue = "";
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getInvoices();
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value.trim()
    this.getInvoices();
  }

  invoices : PerformaInvoice[]=[];
  invoiceSubscriptions! : Subscription;
  getInvoices(){
    this.submittingForm = true;
    this.invoiceSubscriptions = this.invoiceService.getPI(this.status).subscribe((res: any)=>{
      console.log(res);

      this.submittingForm = false;
      this.invoices = res;
      this.totalItems = res.count;
    })
  }

  submittingForm : boolean = false;
  delete!: Subscription
  deleteInvoice(id: number){
    this.submittingForm = true;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // this.delete = this.invoiceService.deleteInvoice(id).subscribe((res)=>{
        //   this.submittingForm = false;
        //   this.getInvoices()
        //   this.snackBar.open("Invoice deleted successfully...","" ,{duration:3000})
        // },(error=>{
        //   this.snackBar.open(error.error.message,"" ,{duration:3000})
        // }))
      }
    })
  }

  status: string = 'GENERATED';
  onStepSelectionChange(event: any) {
    this.currentPage = 1;
    if (event.previouslySelectedStep) {
      if (event.selectedIndex === 0) {
        this.status = 'GENERATED';
        this.getInvoices();
      }else if(event.selectedIndex === 1) {
        this.status = 'KAM VERIFIED'
        this.getInvoices()
      }else if(event.selectedIndex === 2) {
        this.status = 'AM VERIFIED'
        this.getInvoices()
      }else if(event.selectedIndex === 3) {
        this.status = 'BANK SLIP ADDED'
        this.getInvoices()
      }
    }
  }

  onToggleChange( id: number, invoiceNo: string, status: string) {
    const dialogRef = this.dialog.open(VerficationDialogeComponent, {
      data: { invoiceNo: invoiceNo, status: status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.submittingForm = true;
        let data = {
          status: status,
          performaInvoiceId: id
        }
        this.invoiceService.updatePIStatus(data).subscribe(result => {
          this.getInvoices();
          this.submittingForm = false;
          this.snackBar.open(`Invoice ${invoiceNo} updated to ${status}...`,"" ,{duration:3000})
        });
      }
    })
  }

  addBankSlip(id: number, piNo: string){
    const dialogRef = this.dialog.open(AttachBankSlipComponent, {
      data: { invoiceNo: piNo, id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.submittingForm = true;
        let data = {
          status: status,
          performaInvoiceId: id
        }

        this.submittingForm = false;
        this.snackBar.open(`BankSlip is attached with Invoice ${piNo} ...`,"" ,{duration:3000})
        // this.invoiceService.updatePIStatusWithBankSlip(data).subscribe(result => {
        //   console.log(result);
        // });
      }
    })
  }

}
