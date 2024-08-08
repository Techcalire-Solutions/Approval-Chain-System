import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../models/role';
import { LoginService } from '../../login.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent {
  // displayedColumns: string[] = [ 'roleName', 'action'];
  displayedColumns: string[] = ['roleName', 'action'];

  constructor(public dialog: MatDialog, private _snackbar: MatSnackBar, private loginService: LoginService, private fb: FormBuilder, public dialogRef: MatDialogRef<RoleManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  roleForm = this.fb.group({

    roleName: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getRoles()
  }
  roles: Role[] = []
  getRoles() {
    this.loginService.getRole().subscribe((res) => {
      this.roles = res;
      console.log(this.roles);
    })
  }
  onSubmit() {
    console.log(this.roleForm.getRawValue())
    this.loginService.addRole(this.roleForm.getRawValue()).subscribe((res) => {
      console.log(res)
      this._snackbar.open("Role added successfully...", "", { duration: 3000 })
      this.clearControls()
    }, (error => {
      console.log(error)
      alert(error)
    }))
  }

  clearControls() {
    this.roleForm.reset()
    this.roleForm.setErrors(null)
    //Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key).setErrors(null)})
    this.getRoles()
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }
  isEdit = false;
  roleId: any | undefined;
  editFunction(id: any) {
    this.isEdit = true
    this.roleId = id;
    console.log(this.roleId)
    this.loginService.getRoleById(this.roleId).subscribe((res) => {
      let app$ = res
      console.log(app$)


      let roleName = app$.roleName.toString()


      console.log(roleName)

      this.roleForm.patchValue({

        roleName: roleName



      })

    })

  }

  edit() {



    this.isEdit = true
    let data = {
      roleName: this.roleForm.get('roleName')?.value,


    }
    console.log(data)
    console.log(this.roleId)
    this.loginService.updateRole(this.roleId, data).subscribe((res) => {
      this._snackbar.open("Role updated successfully...", "", { duration: 3000 })
      this.clearControls()

      console.log(res)
    })



  }
  deleteFunction(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {

        this.loginService.deleteRole(id).subscribe((res) => {
          this._snackbar.open("Role deleted successfully...", "", { duration: 3000 })
          this.getRoles()
        }, (error => {
          console.log(error)
          this._snackbar.open(error.error.message, "", { duration: 3000 })
        }))
      }
    });


  }

  clear() {
    this.roleForm.reset()

  }

}
