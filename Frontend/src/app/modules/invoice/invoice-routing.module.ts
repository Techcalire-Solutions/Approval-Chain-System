import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadInvoiceComponent } from './components/upload-invoice/upload-invoice.component';
import { ViewInvoicesComponent } from './components/view-invoices/view-invoices.component';
import { PerformInvoiceComponent } from './components/perform-invoice/perform-invoice.component';

const routes: Routes = [
  {path: 'upload', component: UploadInvoiceComponent, data: {breadcrumb: 'Upload'}},
  {path: 'view', data: {breadcrumb: 'View'},
    children: [
      {path: '', component: ViewInvoicesComponent, data: {breadcrumb: 'View'}},
      {path: 'open/:id', component: PerformInvoiceComponent, data: {breadcrumb: 'Open'}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
