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

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  invoices = [
    {no: 'PI-001', client: 'ABCD'}
  ]

}
