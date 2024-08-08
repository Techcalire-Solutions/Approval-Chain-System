import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RoleManagementComponent } from '../role-management/role-management.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { LoginService } from '../../login.service';
import { AttendanceComponent } from '../attendance/attendance.component';

@Component({
  selector: 'app-register-settings',
  templateUrl: './register-settings.component.html',
  styleUrls: ['./register-settings.component.scss']
})
export class RegisterSettingsComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RegisterSettingsComponent>){}
  manageRole(){
    const dialogRef = this.dialog.open(RoleManagementComponent, {
      height: '490px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
  manageTeam(){
    // const dialogRef = this.dialog.open(TeamComponent, {
    //   height: '490px',
    //   width: '600px',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // })
  }
  manageTeamMember(){
    // const dialogRef = this.dialog.open(TeamMemberComponent, {
    //   height: '790px',
    //   width: '800px',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // })
  }
  manageUser(){
    const dialogRef = this.dialog.open(UserManagementComponent, {
      height: '790px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  manageAtt(){
    const dialogRef = this.dialog.open(AttendanceComponent, {
      height: '790px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

}
