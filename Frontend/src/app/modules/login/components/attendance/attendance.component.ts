import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../../login.service';
import { User } from '../../models/user';
import { Attendance } from '../../models/attendance';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.attnSub.unsubscribe();
  }

  constructor(private loginService: LoginService,  public dialogRef: MatDialogRef<AttendanceComponent>){}

  ngOnInit(){
    this.getUsers()
    this.getAttendance()
  }

  users: User[] = [];
  userSub! : Subscription;
  getUsers(){
    this.userSub = this.loginService.getUser().subscribe((res: any)=>{
      this.users = res;
      console.log(this.users);
      this.filteredOptions = this.users
    })
  }

  //Search in MatSelect
  myControl = new FormControl<string | User>('');
  filteredOptions: User[] = [];
  filterOptions(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    this.filteredOptions = this.users.filter(option =>
      (option.name && option.name.toLowerCase().includes(value?.toLowerCase()))
    );
  }

  attnSub!: Subscription;
  attendance: Attendance[] = [];
  getAttendance(){
    this.attnSub = this.loginService.getAttendance().subscribe((res)=>{
      this.attendance = res;
      console.log(this.attendance)
      this.filAttendanceIn = this.attendance.filter(x=>x.logStatus== true)
      this.filAttendanceOut = this.attendance.filter(x=>x.logStatus== false)
    })
  }

  filAttendanceIn: Attendance[] = [];
  filAttendanceOut: Attendance[] = [];
  getAttendanceByUser(id: number){
    this.filAttendanceIn = this.attendance.filter(x=> (x.userId == id) && x.logStatus== true)
    this.filAttendanceOut = this.attendance.filter(x=> (x.userId == id) && x.logStatus== false)
  }

  datePipe = new DatePipe('en-US')
  attendaceByDate(event: any){
    const selectedDate = event.value;
    console.log(selectedDate)
    const formattedDate  = selectedDate.toLocaleDateString().split("T")[0]
    console.log(formattedDate)
    this.filAttendanceIn = this.attendance.filter(x=>(this.datePipe.transform(x.date, 'dd/MM/yyyy') == formattedDate) && x.logStatus == true)
    this.filAttendanceOut = this.attendance.filter(x=>(this.datePipe.transform(x.date, 'dd/MM/yyyy') == formattedDate) && x.logStatus == false)
  }

  displayedColumns : string[] = ['userId', 'date', 'time']

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
