import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.roleSubscription?.unsubscribe();
    this.submit?.unsubscribe();
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar, private route: ActivatedRoute){}

  id!: number
  ngOnInit(): void {
    this.getRole();
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.patchForm(this.id);
    }
  }

  userSub!: Subscription;
  isEdit: boolean = false;
  patchForm(id: number){
    this.isEdit = true;
    this.userSub = this.loginService.getUserById(id).subscribe(user => {
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        roleId: user.roleId,
        status: user.status,
      })
    })
  }

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    password: ['', Validators.required],
    roleId: <any>['', Validators.required],
    status: [true]
  });

  suggestions: any[] = [];
  searchUser(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    console.log(filterValue);

    // if (filterValue) {
    //   this.userService.getUserByName(filterValue).subscribe((res: any) => {
    //     console.log(res);

    //     if (res.length > 0) {
    //       this.suggestions = res;

    //     } else {
    //       console.log("hiiiiiiiii");

    //       this.suggestions = [];
    //       this.editstatus = false;
    //       const name = this.userForm.get('name')?.value;
    //       this.userForm.reset();
    //       this.userForm.patchValue({ name: name });
    //     }
    //   });
    // } else {
    //   this.suggestions = [];
    //   this.userForm.reset();
    // }
  }

  patchUser(event: any): void {
    // const selectedValue: User = event.option.value;
    // console.log(selectedValue.name);

    // this.userForm.patchValue({
    //   name: selectedValue.name,
    //   phoneNumber: selectedValue.phoneNumber,
    //   password: selectedValue.password,
    //   roleId: selectedValue.roleId,
    //   branchId: selectedValue.branchId,
    //   accessLevel: selectedValue.accessLevel,
    //   status: selectedValue.status,
    // })
    // if (selectedValue.accessLevel === 'StoreAndWarehouse' )
    //     this.userForm.patchValue({
    //       checkStore : true,
    //       checkWarehouse : true,
    //     })

    // else if (selectedValue.accessLevel === 'Store' )
    //   this.userForm.patchValue({
    //     checkStore : true,
    //     checkWarehouse : false,
    //   })

    // else if (selectedValue.accessLevel === 'Warehouse' )
    //   this.userForm.patchValue({
    //     checkStore : false,
    //     checkWarehouse : true,
    //   })
    // this.markReadonlyControls()
  }

  roles: any[] = [];
  roleSubscription?: Subscription;
  getRole(value?: string){
    this.roleSubscription = this.loginService.getRole(value).subscribe(role => {
      this.roles = role;
    })
  }

  filterRole(event: Event | string) {
    let value: string = "";
    if (typeof event === "string") {
      value = event;
    } else if (event instanceof Event) {
      value = (event.target as HTMLInputElement).value;
    }
    this.getRole(value)
  }

  addRole(){
    // const dialogRef = this.dialog.open(RoleComponent, {
    //   data: {status : 'true'}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getRole()
    // })
  }

  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submittingForm: boolean = false;
  editStatus: boolean = false;
  submit!: Subscription;
  onSubmit(){
    this.submittingForm = true
    this.submit = this.loginService.registerUser(this.userForm.getRawValue()).subscribe(result => {
      this.submittingForm = false;
      history.back();
      this.snackBar.open("User added successfully...","" ,{duration:3000})
    })
  }

  editFunction(){
    this.submittingForm = true;
    this.submit = this.loginService.updateUser(this.id, this.userForm.getRawValue()).subscribe(result => {
      this.submittingForm = false;
      history.back();
      this.snackBar.open("User added successfully...","" ,{duration:3000})
    });
  }

}
