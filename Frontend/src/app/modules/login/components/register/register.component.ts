import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../login.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb:FormBuilder, private router:Router, private loginService: LoginService) { }

  registerForm = this.fb.group({

    name: null,
    email:null,
    phoneNumber: null,
    password:null,
    roleName:[''],
  })
  ngOnInit(): void {
    this.getRole()
  }


  submit(){
    // let {email,password}=this.registerForm.getRawValue()
    // if(email=="nibinm@gmail.com"&&password=="123456"){
    //   this.router.navigate(['/admin']);
    //   return
    // }
    // alert("Email or password is in correct")

    console.log(this.registerForm.getRawValue())
    this.loginService.registerUser(this.registerForm.getRawValue()).subscribe((res)=>{
      console.log(res)


  })
}
roles : Role[]=[]
getRole(){
  this.loginService.getRole().subscribe((r)=>{
    this.roles = r;
  })
}

roleName: any;
  findRoleName(id:any){
    this.roleName = this.roles.find(x=>x.id==id)?.roleName
  }


}
