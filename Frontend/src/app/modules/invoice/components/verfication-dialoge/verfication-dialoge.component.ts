import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verfication-dialoge',
  templateUrl: './verfication-dialoge.component.html',
  styleUrls: ['./verfication-dialoge.component.scss']
})
export class VerficationDialogeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  constructor(public dialog: MatDialog, @Optional() public dialogRef: MatDialogRef<VerficationDialogeComponent>, private fb: FormBuilder,
   @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any){}

   form = this.fb.group({
    remarks: ['']
   });

  invoiceNo!: string;
  status!: string;
  ngOnInit(): void {
    this.invoiceNo = this.dialogData.invoiceNo;
    this.status = this.dialogData.status;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    let data = {
      value: true, remarks: this.form.get('remarks')?.value
    }
    this.dialogRef.close(data);
  }

}
