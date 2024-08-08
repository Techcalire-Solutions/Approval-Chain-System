import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { LoginService } from '../../login.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.userSubscriptions?.unsubscribe();
  }

  constructor(private loginService: LoginService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnInit(): void {
    console.log("user");
    this.getUsers()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  filterValue = "";
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value.trim()
    this.getUsers()
  }

  users : User[]=[];
  userSubscriptions! : Subscription;
  getUsers(){
    this.submittingForm = true;
    this.userSubscriptions = this.loginService.getUser(this.filterValue, this.currentPage, this.pageSize).subscribe((res: any)=>{
      this.submittingForm = false;
      this.users = res.items;
      this.totalItems = res.count;
    })
  }

  submittingForm : boolean = false;
  onToggleChange(event: any, id: number) {
    this.submittingForm = true;
    const newValue = event.checked;

    let data = {
      status : newValue
    }
    this.loginService.updateUserStatus(id, data).subscribe(data=>{
      this.submittingForm = false;
      this.snackBar.open("User status updated successfully...","" ,{duration:3000})
    });
  }

  delete!: Subscription
  deleteUser(id: number){
    this.submittingForm = true;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete = this.loginService.deleteUser(id).subscribe((res)=>{
          this.submittingForm = false;
          this.getUsers()
          this.snackBar.open("User deleted successfully...","" ,{duration:3000})
        },(error=>{
          this.snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

}
