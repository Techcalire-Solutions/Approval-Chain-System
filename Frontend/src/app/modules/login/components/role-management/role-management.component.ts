import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../models/role';
import { LoginService } from '../../login.service';
import { DeleteComponent } from '../delete/delete.component';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.roleSub?.unsubscribe();
  }

  constructor(public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getRoles()
  }

  roles: Role[] = []
  filterValue: string = '';
  roleSub!: Subscription;
  submittingForm: boolean = false;
  getRoles() {
    this.submittingForm = true;
    this.roleSub = this.loginService.getRole(this.filterValue, this.currentPage, this.pageSize).subscribe((res: any) => {
      this.submittingForm = false;
      this.roles = res.items;
      this.totalItems = res.count;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue = filterValue;
    this.getRoles();
  }

  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getRoles();
  }
}
