import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../login.service';
import { Attendance } from '../../models/attendance';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSignUpMode = false; // Controls the mode (sign-up/sign-in)

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  // Toggles the sign-up mode
  toggleSignUpMode(isSignUp: boolean = true): void {
    this.isSignUpMode = isSignUp;
  }

  onSignIn(): void {
    console.log(this.loginForm.getRawValue())
    this.loginService.loginUser(this.loginForm.getRawValue()).subscribe((res)=>{
      // this.user =res
      console.log('res'+res)
      if(res){
        this.setCurrentUser()
      }
      // this.router.navigateByUrl('/admin')

    })
  }

  onSignUp(): void {
    // Handle sign-up logic here
  }


  user: any;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });


  submit(){
    // let {email,password}=this.loginForm.getRawValue()
    // if(email=="nibinm@gmail.com"&&password=="123456"){
    //   this.router.navigate(['/admin']);
    //   return
    // }
    // alert("Email or password is in correct")

  }

  // setCurrentUser(){
  //   if(localStorage.getItem('token')){
  //     const token: any = localStorage.getItem('token')
  //     let user = JSON.parse(token)
  //     console.log(user)
  //     // this._http.setCurrentUser(user)
  //     let roleid = user.userToken.role
  //     this.adminService.getRoleById(roleid).subscribe((res)=>{
  //       let role = res.roleName.toLowerCase();
  //       this.router.navigate([role]);
  //     })

  //   }
  // }

  datePipe = new DatePipe('en-US')
  setCurrentUser(){
    if(localStorage.getItem('token')){
      const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      console.log(user)

      let roleid = user.role
      console.log(roleid);

      // this.loginService.getRoleById(roleid).subscribe((res)=>{
      //   console.log(res);

        // let role = res.roleName.toLowerCase();

          // this.loginService.getAttendance().pipe(
          //   map((x : Attendance[]) => x.filter((y) =>
          //     this.datePipe.transform(y.date, 'yyyy-MM-dd') == this.datePipe.transform(new Date(), 'yyyy-MM-dd') &&
          //     y.logStatus == true
          //   ))
          // ).subscribe((res)=>{
          //   let attn = res
          //   console.log(attn.length)
          //   if(attn.length == 0){
          //      // ATTENDANCE
          //     let data = {
          //       userId: user.userToken.id,
          //       logStatus: true
          //     }
          //     console.log(data)
          //     this.loginService.addAttendance(data).subscribe((res)=>{
          //       console.log(res);

          //       this._snackBar.open("Welcome" + user.userToken.name,"" ,{duration:3000})
          //     })
          //   }
          // })
          this.router.navigate(['home']);
      // })
    }
  }
}
