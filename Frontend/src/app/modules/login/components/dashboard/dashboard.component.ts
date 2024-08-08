import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginService } from "../../login.service";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  pendingRfqs!: number;
  saleCount!: any;
  quotCount:any;
  sales: any;
  topSellingParts: any;
  stockCount=0;
  constructor(private loginService: LoginService, public router:Router) {}
     teamMemberId!: number
  ngOnInit() {

  }



}
