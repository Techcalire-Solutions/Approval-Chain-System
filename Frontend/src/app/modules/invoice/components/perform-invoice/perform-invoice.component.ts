import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../invoice.service';
import { Subscription } from 'rxjs';
import { PerformaInvoice } from '../../models/performa-invoice';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { VerficationDialogeComponent } from '../verfication-dialoge/verfication-dialoge.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttachBankSlipComponent } from '../attach-bank-slip/attach-bank-slip.component';
import { LoginService } from 'src/app/modules/login/login.service';

@Component({
  selector: 'app-perform-invoice',
  templateUrl: './perform-invoice.component.html',
  styleUrls: ['./perform-invoice.component.scss']
})
export class PerformInvoiceComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {

  }

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private dialog: MatDialog, private snackBar: MatSnackBar,
    private router: Router, private loginService: LoginService
  ){}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getPiById(id)
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)

    let roleId = user.role
    this.getRoleById(roleId)
  }

  roleSub!: Subscription;
  roleName!: string;
  sp: boolean = false;
  kam: boolean = false;
  am: boolean = false;
  ma: boolean = false;
  getRoleById(id: number){
    this.roleSub = this.loginService.getRoleById(id).subscribe(role => {
      this.roleName = role.roleName;
      if(this.roleName === 'Initiator Sales Person') this.sp = true;
      if(this.roleName === 'Key Account Manager') this.kam = true;
      if(this.roleName === 'Authorizer Manager') this.am = true;
      if(this.roleName === 'Maker Accountant') this.ma = true;
    })
  }

  piSub!: Subscription;
  url!: string;
  piNo!: string;
  pi!: PerformaInvoice;
  bankSlip!: string;
  getPiById(id: number){
    this.piSub = this.invoiceService.getPIById(id).subscribe(pi => {
      this.pi = pi;
      this.piNo = pi.piNo;
      this.url = environment.apiUrl + pi.url;
      if(pi.bankSlip != null) this.bankSlip = environment.apiUrl + pi.bankSlip;
      this.getPiStatusByPiId(id)
    });
  }

  statusSub!: Subscription;
  getPiStatusByPiId(id: number){
    this.statusSub = this.invoiceService.getPIStatusByPIId(id).subscribe(status => {
      console.log(status);
    });
  }

  submittingForm: boolean = false;
  verified(value: string){
    this.submittingForm = true;
    let status = this.pi.status;
    console.log(this.pi);

    let sp = this.pi.salesPerson.name

    if(status === 'GENERATED' && value === 'approved') status = 'KAM VERIFIED';
    else if(status === 'GENERATED' && value === 'rejected') status = 'KAM REJECTED';
    else if(status === 'KAM VERIFIED' && value === 'approved') status = 'AM VERIFIED';
    else if(status === 'KAM VERIFIED' && value === 'rejected') status = 'AM REJECTED';
    // else if(status === 'AM VERIFIED' ) return this.addBankSlip(this.pi.id, this.piNo)

    const dialogRef = this.dialog.open(VerficationDialogeComponent, {
      data: { invoiceNo: this.piNo, status: status, sp: sp }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.submittingForm = true;
        let data = {
          status: status,
          performaInvoiceId: this.pi.id,
          remarks: result.remarks,
          amId: result.amId,
          accountantId: result.accountantId
        }
        console.log(data);

        this.invoiceService.updatePIStatus(data).subscribe(result => {
          console.log(result);

          this.submittingForm = false;
          this.router.navigateByUrl('/home/invoice/view')
          this.snackBar.open(`Invoice ${this.piNo} updated to ${status}...`,"" ,{duration:3000})
        });
      }
    })
  }

  addBankSlip(piNo: string){
    let id = this.pi.id;
    let sp = this.pi.salesPerson.name;

    const dialogRef = this.dialog.open(AttachBankSlipComponent, {
      data: { invoiceNo: piNo, id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPiById(id)
        this.snackBar.open(`BankSlip is attached with Invoice ${piNo} ...`,"" ,{duration:3000})
        // this.invoiceService.updatePIStatusWithBankSlip(data).subscribe(result => {
        //   console.log(result);
        // });
      }
    })
  }
}
