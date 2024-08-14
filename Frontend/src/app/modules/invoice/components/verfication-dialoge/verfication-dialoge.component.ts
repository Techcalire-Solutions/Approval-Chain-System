import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/modules/login/login.service';
import { User } from 'src/app/modules/login/models/user';

@Component({
  selector: 'app-verfication-dialoge',
  templateUrl: './verfication-dialoge.component.html',
  styleUrls: ['./verfication-dialoge.component.scss']
})
export class VerficationDialogeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  constructor(public dialog: MatDialog, @Optional() public dialogRef: MatDialogRef<VerficationDialogeComponent>, private fb: FormBuilder,
   @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any, private loginService: LoginService){}

   form = this.fb.group({
    remarks: [''],
    amId: [],
    accountantId: [],
    spId: [''],
   });

  invoiceNo!: string;
  status!: string;
  ngOnInit(): void {
    this.invoiceNo = this.dialogData.invoiceNo;
    this.status = this.dialogData.status;
    console.log(this.dialogData);

    this.form.get('spId')?.setValue(this.dialogData.sp)
    if(this.status == 'KAM VERIFIED') this.getAm()
    if(this.status == 'AM VERIFIED') this.getMa()
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    let data = {
      value: true,
      remarks: this.form.get('remarks')?.value,
      amId:  this.form.get('amId')?.value,
      accountantId: this.form.get('accountantId')?.value
    }
    this.dialogRef.close(data);
  }

  userSub!: Subscription;
  am: User[] = [];
  getAm(){
    this.userSub = this.loginService.getUserByRole(3).subscribe(data => {
      this.am = data;
    });
  }

  getMa(){
    this.userSub = this.loginService.getUserByRole(4).subscribe(data => {
      this.am = data;
    });
  }

}
