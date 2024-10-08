import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadInvoiceComponent } from './components/upload-invoice/upload-invoice.component';
import { ViewInvoicesComponent } from './components/view-invoices/view-invoices.component';
import { PerformInvoiceComponent } from './components/perform-invoice/perform-invoice.component';
import { ResponsiveTableComponent } from './components/responsive-table/responsive-table.component';

const routes: Routes = [
  {path: 'upload', component: UploadInvoiceComponent, data: {breadcrumb: 'Upload'}},
  {path: 'open/:id', component: PerformInvoiceComponent, data: {breadcrumb: 'Open'}},
  {path: 'update/:id', component: UploadInvoiceComponent, data: {breadcrumb: 'Update'}},
  {path: 'responsive', component: ResponsiveTableComponent, data: {breadcrumb: 'Update'}},
  {path: 'view', data: {breadcrumb: 'View'},
    children: [
      {path: '', component: ResponsiveTableComponent, data: {breadcrumb: 'View'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
