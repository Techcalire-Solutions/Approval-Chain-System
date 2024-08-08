import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private loginService: LoginService,
    public dialogRef: MatDialogRef<LogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar
  ) {}

  roleName!: string
  ngOnInit(): void {
    this.loginService.getRoleById(this.data.role).subscribe((role) => {
      this.roleName = role.roleName.toLowerCase();
      console.log(this.roleName);
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  logData!: any
  onConfirmClick(): void {
    this.logData = {
      userId : this.data.id,
      logStatus : false
    }

    console.log(this.logData);
    this.loginService.addAttendance(this.logData).subscribe((res)=>{
      console.log(res);
      this._snackBar.open("Attendance added successfully...","" ,{duration:3000})
    },(error=>{
      console.log(error)
      this._snackBar.open(error.error.message,"" ,{duration:3000})
    }))
    this.dialogRef.close(true);
  }

}
