import { Component, OnInit, ViewEncapsulation, Input,Output,EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { ResponsiveTableHelpers } from './helpers.data';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../../invoice.service';
import { LoginService } from 'src/app/modules/login/login.service';
import { PerformaInvoice } from '../../models/performa-invoice';

@Component({
  selector: 'cdk-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss']
})
export class ResponsiveTableComponent implements OnInit, OnDestroy {

  	displayedColumns = ['piNo','kam', 'view', 'manage'];
    rows: any[] = [];
    sortedData!: any[];
    showResponsiveTableCode!: any;

	@ViewChild(MatPaginator, { static: true }) paginator1!: MatPaginator;
    pageLength = 0;
    pageSize = 15;
    @Input() status: string = 'GENERATED';
    @Input() actionStatus!: any;
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() view = new EventEmitter();
    @Output() page = new EventEmitter();
    @Output() sort = new EventEmitter();
    @Output() dup = new EventEmitter();

  	constructor(private invoiceService: InvoiceService, private loginService: LoginService) {
   	}

    ngOnDestroy(): void {
      this.roleSub?.unsubscribe();
      this.invoiceSubscriptions?.unsubscribe();
    }


    ngOnInit() {
      const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)

      let roleId = user.role
      this.getRoleById(roleId)
    }

    roleSub!: Subscription;
    roleName!: string;
    getRoleById(id: number){
      this.roleSub = this.loginService.getRoleById(id).subscribe(role => {
        this.roleName = role.roleName;
        console.log(this.roleName);

        if(this.roleName === 'Initiator Sales Person') this.status = '';
        if(this.roleName === 'Key Account Manager') this.status = 'GENERATED';
        if(this.roleName === 'Authorizer Manager') this.status = 'KAM VERIFIED';
        if(this.roleName === 'Maker Accountant') this.status = 'AM VERIFIED';
        this.getInvoices();
      })
    }

  	next(event: any) {
        this.sortedData = [];
    	for (var i= 1 * event.pageIndex * event.pageSize; i< event.pageSize+event.pageIndex*event.pageSize ;i++) {
            // this.sortedData = [...this.sortedData, this.helpers.rows[i]];
        }
    }

    sortData(sort: Sort) {
        const data = this.rows;

        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';

            if (['id', 'progress'].includes(sort.active)) {
                return compare(parseInt(a[sort.active]), parseInt(b[sort.active]), isAsc)
            }

            return compare(a[sort.active], b[sort.active], isAsc)
        });
    }

    findDuplicates(row: any){

    }

    invoices: any[] = [];
    invoiceSubscriptions!: Subscription;
    submittingForm: boolean = false;

    getInvoices() {
      console.log(this.status);

      this.submittingForm = true;
      let invoice!: PerformaInvoice[];

      let apiCall;

      if (this.roleName === 'Initiator Sales Person') {
        apiCall = this.invoiceService.getPIBySP(this.status);
      } else if (this.roleName === 'Key Account Manager') {
        apiCall = this.invoiceService.getPIByKAM(this.status);
      } else if (this.roleName === 'Authorizer Manager') {
        console.log("hiiiiiiiiiiiii");

        apiCall = this.invoiceService.getPIByAM(this.status);
      } else if (this.roleName === 'Maker Accountant') {
        apiCall = this.invoiceService.getPIByMA(this.status);
      }

      if (apiCall) {
        console.log(apiCall);

        this.invoiceSubscriptions = apiCall.subscribe((res: any) => {
          console.log(res);

          invoice = res;

          if (invoice) {
            invoice.forEach((mainObj: any) => {
              const matchingStatus = mainObj.performaInvoiceStatuses.find(
                (statusObj: any) => statusObj.status === mainObj.status
              );
              if (matchingStatus) {
                mainObj.remarks = matchingStatus.remarks;
              }
            });
            console.log(invoice);
            this.invoices = invoice;
          }

          this.submittingForm = false;
        }, (error: any) => {
          // Handle error here if needed
          this.submittingForm = false;
        });
      } else {
        this.submittingForm = false;
      }
    }


    onStepSelectionChange(status: string) {
      console.log(status);

      if(this.roleName === 'Initiator Sales Person'){
        if(status === 'assigned'){
          this.status = '';
          this.getInvoices();
        }else if(status === 'completed'){
          this.status = 'BANK SLIP ISSUED';
          this.getInvoices()
        }else if(status === 'all'){
        }
      }else if(this.roleName === 'Key Account Manager') {
        if(status === 'pending'){
          this.status = 'GENERATED'
          this.getInvoices()
        }else if(status === 'assigned'){
          this.status = ''
          this.getInvoices()
        }else if(status === 'completed'){
          this.status = 'BANK SLIP ISSUED';
          this.getInvoices()
        }else if(status === 'all'){

        }

      }else if(this.roleName === 'Authorizer Manager') {
        if(status === 'pending'){
          this.status = 'KAM VERIFIED';
          this.getInvoices()
        }else if(status === 'assigned'){
          this.status = ''
          this.getInvoices()
        }else if(status === 'completed'){
          this.status = "BANK SLIP ISSUED"
          this.getInvoices()
        }else if(status === 'all'){

        }

      }else if(this.roleName === 'Maker Accountant') {
        if(status === 'pending'){
          this.status = 'AM VERIFIED'
          this.getInvoices()
        }else if(status === 'assigned'){
          this.status = ''
          this.getInvoices()
        }else if(status === 'completed'){
          this.status = 'BANK SLIP ISSUED'
          this.getInvoices()
        }else if(status === 'all'){

        }

      }
    }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
