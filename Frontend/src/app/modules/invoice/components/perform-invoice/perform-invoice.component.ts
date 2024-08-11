import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../invoice.service';
import { Subscription } from 'rxjs';
import { PerformaInvoice } from '../../models/performa-invoice';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { VerficationDialogeComponent } from '../verfication-dialoge/verfication-dialoge.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perform-invoice',
  templateUrl: './perform-invoice.component.html',
  styleUrls: ['./perform-invoice.component.scss']
})
export class PerformInvoiceComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {

  }

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private dialog: MatDialog, private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getPiById(id)
  }

  piSub!: Subscription;
  url!: string;
  piNo!: string;
  pi!: PerformaInvoice;
  getPiById(id: number){
    this.piSub = this.invoiceService.getPIById(id).subscribe(pi => {
      this.pi = pi;
      this.piNo = pi.piNo;
      this.url = environment.apiUrl + pi.url;
    });
  }

  submittingForm: boolean = false;
  verified(){
    this.submittingForm = true;
    let status = this.pi.status;

    if(status === 'GENERATED') status = 'KAM VERIFIED';
    else if(status === 'KAM VERIFIED') status = 'AM VERIFIED';
    // else if(status === 'AM VERIFIED') status = ''

    const dialogRef = this.dialog.open(VerficationDialogeComponent, {
      data: { invoiceNo: this.piNo, status: status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.submittingForm = true;
        let data = {
          status: status,
          performaInvoiceId: this.pi.id
        }
        this.invoiceService.updatePIStatus(data).subscribe(result => {
          console.log(result);

          this.submittingForm = false;
          this.router.navigateByUrl('/home/invoice/view')
          this.snackBar.open(`Invoice ${this.piNo} updated to ${status}...`,"" ,{duration:3000})
        });
      }
    })
  }

}
