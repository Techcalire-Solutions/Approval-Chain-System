import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { MaterialModule } from '../login/material/material.module';
import { UploadInvoiceComponent } from './components/upload-invoice/upload-invoice.component';
import { ViewInvoicesComponent } from './components/view-invoices/view-invoices.component';
import { PerformInvoiceComponent } from './components/perform-invoice/perform-invoice.component';
import { VerficationDialogeComponent } from './components/verfication-dialoge/verfication-dialoge.component';
import { AttachBankSlipComponent } from './components/attach-bank-slip/attach-bank-slip.component';
import { ResponsiveTableComponent } from './components/responsive-table/responsive-table.component';
import { SafePipe } from '../login/safe.pipe';


@NgModule({
  declarations: [
    SafePipe,
    UploadInvoiceComponent,
    ViewInvoicesComponent,
    PerformInvoiceComponent,
    VerficationDialogeComponent,
    AttachBankSlipComponent,
    ResponsiveTableComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MaterialModule
  ]
})
export class InvoiceModule { }
