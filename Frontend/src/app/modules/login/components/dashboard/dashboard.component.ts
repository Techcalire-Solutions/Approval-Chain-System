import { Component, AfterViewInit, EventEmitter, Input, Output, ViewChild, HostListener } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { Subscription } from "rxjs";
import { InvoiceService } from "src/app/modules/invoice/invoice.service";
import { PerformaInvoice } from "src/app/modules/invoice/models/performa-invoice";
import { LoginService } from "../../login.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { VerficationDialogeComponent } from "src/app/modules/invoice/components/verfication-dialoge/verfication-dialoge.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AttachBankSlipComponent } from "src/app/modules/invoice/components/attach-bank-slip/attach-bank-slip.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit {

  displayedColumns = ['piNo','kam', 'view', 'manage'];
  rows: any[] = [];
  sortedData!: any[];
  showResponsiveTableCode!: any;

@ViewChild(MatPaginator, { static: true }) paginator1!: MatPaginator;
  @Input() status: string = '';
  @Input() actionStatus!: any;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() page = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() dup = new EventEmitter();

  selectedTab: string = '';
  onTabClick(tabName: string) {
    this.selectedTab = tabName;
  }

  constructor(private invoiceService: InvoiceService, private loginService: LoginService, private dialog: MatDialog, private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
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
  sp: boolean = false;
  kam: boolean = false;
  am: boolean = false;
  ma: boolean = false;
  getRoleById(id: number){
    this.roleSub = this.loginService.getRoleById(id).subscribe(role => {
      this.roleName = role.roleName;
      console.log(this.roleName);

      if(this.roleName === 'Initiator Sales Person') { this.status = 'REJECTED'; this.sp = true }
      if(this.roleName === 'Key Account Manager') { this.status = 'GENERATED'; this.kam = true }
      if(this.roleName === 'Authorizer Manager') { this.status = 'KAM VERIFIED'; this.am = true }
      if(this.roleName === 'Maker Accountant') { this.status = 'AM VERIFIED'; this.ma = true }
      this.getInvoices();
      console.log(this.status);

    })
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
    this.submittingForm = true;
    let invoice!: PerformaInvoice[];

    let apiCall;

    if (this.roleName === 'Initiator Sales Person') {
      apiCall = this.invoiceService.getPIBySP(this.status, this.filterValue, this.currentPage, this.pageSize);
    } else if (this.roleName === 'Key Account Manager') {
      apiCall = this.invoiceService.getPIByKAM(this.status, this.filterValue, this.currentPage, this.pageSize);
    } else if (this.roleName === 'Authorizer Manager') {
      apiCall = this.invoiceService.getPIByAM(this.status, this.filterValue, this.currentPage, this.pageSize);
    } else if (this.roleName === 'Maker Accountant') {
      this.pageStatus = false
      apiCall = this.invoiceService.getPIByMA(this.status, this.filterValue, this.currentPage, this.pageSize);
    }

    if (apiCall) {
      console.log(apiCall);

      this.invoiceSubscriptions = apiCall.subscribe((res: any) => {
        console.log(res);

        invoice = res.items;
        this.totalItems = res.count;

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

  filterValue!: string;
  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value.trim()
    this.getInvoices()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;
  currentPage = 1;
  totalItems = 0;
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getInvoices();
  }

  pageStatus: boolean = true;
  onStepSelectionChange(status: string) {
    console.log(status);
    if(this.roleName === 'Initiator Sales Person'){
      if(status === 'assigned'){
        this.status = '';
        this.getInvoices();
      }else if(status === 'pending'){
        this.status = 'REJECTED';
        this.getInvoices()
      }else if(status === 'completed'){
        this.status = 'BANK SLIP ISSUED';
        this.getInvoices()
      }else if(status === 'all'){
      }
    }else if(this.roleName === 'Key Account Manager') {
      if(status === 'pending'){
        this.pageStatus = true;
        this.status = 'GENERATED'
        this.getInvoices()
      }else if(status === 'assigned'){
        this.pageStatus = false;
        this.status = ''
        this.getInvoices()
      }else if(status === 'completed'){
        this.pageStatus = false;
        this.status = 'BANK SLIP ISSUED';
        this.getInvoices()
      }else if(status === 'all'){
        this.pageStatus = false;

      }

    }else if(this.roleName === 'Authorizer Manager') {
      if(status === 'pending'){
        this.pageStatus = true;
        this.status = 'KAM VERIFIED';
        this.getInvoices()
      }else if(status === 'assigned'){
        this.pageStatus = false;
        this.status = ''
        this.getInvoices()
      }else if(status === 'completed'){
        this.pageStatus = false;
        this.status = "BANK SLIP ISSUED"
        this.getInvoices()
      }else if(status === 'all'){
        this.pageStatus = false;

      }

    }else if(this.roleName === 'Maker Accountant') {
      if(status === 'pending'){
        this.pageStatus = false;
        this.status = 'AM VERIFIED'
        this.getInvoices()
      }else if(status === 'assigned'){
        this.pageStatus = false;
        this.status = ''
        this.getInvoices()
      }else if(status === 'completed'){
        this.pageStatus = false;
        this.status = 'BANK SLIP ISSUED'
        this.getInvoices()
      }else if(status === 'all'){
        this.pageStatus = false;

      }

    }
  }

  // submittingForm: boolean = false;
  verified(value: string, piNo: string, sp: string, id: number){
    this.submittingForm = true;
    console.log(this.status);

    if(this.status === 'GENERATED' && value === 'approved') this.status = 'KAM VERIFIED';
    else if(this.status === 'GENERATED' && value === 'rejected') this.status = 'KAM REJECTED';
    else if(this.status === 'KAM VERIFIED' && value === 'approved') this.status = 'AM VERIFIED';
    else if(this.status === 'KAM VERIFIED' && value === 'rejected') this.status = 'AM REJECTED';
    // else if(status === 'AM VERIFIED' ) return this.addBankSlip(this.pi.id, this.piNo)

    const dialogRef = this.dialog.open(VerficationDialogeComponent, {
      data: { invoiceNo: piNo, status: this.status, sp: sp }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.submittingForm = true;
        let data = {
          status: this.status,
          performaInvoiceId: id,
          remarks: result.remarks,
          amId: result.amId,
          accountantId: result.accountantId
        }

        this.invoiceService.updatePIStatus(data).subscribe(result => {
          this.submittingForm = false;
          this.getInvoices()
          this.snackBar.open(`Invoice ${piNo} updated to ${this.status}...`,"" ,{duration:3000})
        });
      }
    })
  }

  addBankSlip(piNo: string, id: number){
    const dialogRef = this.dialog.open(AttachBankSlipComponent, {
      data: { invoiceNo: piNo, id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getInvoices()
        this.snackBar.open(`BankSlip is attached with Invoice ${piNo} ...`,"" ,{duration:3000})
        // this.invoiceService.updatePIStatusWithBankSlip(data).subscribe(result => {
        //   console.log(result);
        // });
      }
    })
  }

  private pressTimer: any;
  private longPressDuration = 500; // Duration in ms for a long press
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    clearTimeout(this.pressTimer);
  }

  @HostListener('document:mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    clearTimeout(this.pressTimer);
  }

  onMouseDown(event: MouseEvent, invoice: any) {
    this.pressTimer = setTimeout(() => {
      this.openDialog(invoice);
    }, this.longPressDuration);
  }

  openDialog(invoice: any) {
    const snackBarRef = this.snackBar.open('Approve or Reject?', 'Approve', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    snackBarRef.onAction().subscribe(() => {
      this.handleApprove(invoice);
    });

    snackBarRef.afterDismissed().subscribe(info => {
      if (!info.dismissedByAction) {
        // If not dismissed by action, prompt for rejection
        this.snackBar.open('Do you want to reject?', 'Reject', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }).onAction().subscribe(() => {
          this.handleReject(invoice);
        });
      }
    });
  }

  handleApprove(invoice: any) {
    // Handle approval logic here
    console.log('Invoice approved:', invoice);
  }

  handleReject(invoice: any) {
    // Handle rejection logic here
    console.log('Invoice rejected:', invoice);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
