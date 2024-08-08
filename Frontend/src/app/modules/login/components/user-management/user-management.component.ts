import { LoginComponent } from './../login/login.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../login.service';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{
  displayedColumns: string[] = [ 'name','email','phoneNumber','role', 'action'];
  constructor(public dialog: MatDialog,private _snackbar: MatSnackBar, private loginService: LoginService, private fb: FormBuilder, public dialogRef: MatDialogRef<UserManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
    ngOnInit(): void{
      this.getRoles()
      this.getUsers()
      // this.getCompany();
    }
    userForm = this.fb.group({

      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],


      password:[''],
      roleId: ['']
    });
    phoneNumberValidator(control: { value: string }) {
      // Phone number validation logic goes here
      // Example: You can use a regex pattern for a simple validation
      const phoneNumberPattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;

      return phoneNumberPattern.test(control.value)
        ? null
        : { invalidPhoneNumber: true };
    }
    get phoneNumber() {
      return this.userForm.get("phoneNumber");
    }
    role$! : Observable<Role[]>
    getRoles(){
      this.role$ = this.loginService.getRole()
      console.log(this.role$)
    }
    users$: Observable <User []> = new Observable<User[]>();
    getUsers(){
      this.users$ = this.loginService.getUser()
        console.log(this.users$);
    }

  onSubmit(){
    console.log(this.userForm.getRawValue())
    this.loginService.registerUser(this.userForm.getRawValue()).subscribe((res)=>{
      console.log(res)
      // this._snackBar.open("Category added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      console.log(error)
      alert(error)
    }))
  }
  clearControls(){
    this.userForm.reset()
    this.userForm.setErrors(null)
    //Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key).setErrors(null)})
    this.getUsers()
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  isEdit = false;
  userId:any | undefined;
editFunction(id : any){
  this.isEdit = true
  this.userId = id;
  this.loginService.getUserById(this.userId).subscribe((res)=>{
   let app$ = res
    console.log(app$)


    let name = app$.name.toString()
    let email= app$.email.toString()
    let phoneNumber = app$.phoneNumber.toString()
    // let password= app$.password.toString()
    // let roleId= app$.roleId.toString()




    this.userForm.patchValue({

      name: name,
      email:email,
      phoneNumber: phoneNumber,
      // password:password,
      // roleId:roleId



    })

  })

}

edit(){



  this.isEdit= true
  let data ={
    name: this.userForm.get('name')?.value,
    email : this.userForm.get('email')?.value,
    phoneNumber: this.userForm.get('phoneNumber')?.value,
    password : this.userForm.get('password')?.value,
    roleId: this.userForm.get('roleId')?.value,

  }
  this.loginService.updateUser(this.userId,data).subscribe((res)=>{
    this._snackbar.open("User updated successfully...","" ,{duration:3000})
    this.clearControls()

    console.log(res)
  })



  }
  deleteFunction(id: number){
  const dialogRef = this.dialog.open(DeleteComponent, {
    width: '450px',
    data: {}
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {

      this.loginService.deleteUser(id).subscribe((res)=>{
        this._snackbar.open("User deleted successfully...","" ,{duration:3000})
        this.getUsers()
      },(error=>{
        console.log(error)
        this._snackbar.open(error.error.message,"" ,{duration:3000})
      }))
    }
  });


  }
  clear() {
    this.userForm.reset()

  }
}
