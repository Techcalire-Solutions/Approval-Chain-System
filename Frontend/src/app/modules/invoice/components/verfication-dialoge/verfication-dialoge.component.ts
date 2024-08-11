import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verfication-dialoge',
  templateUrl: './verfication-dialoge.component.html',
  styleUrls: ['./verfication-dialoge.component.scss']
})
export class VerficationDialogeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  constructor(public dialog: MatDialog, @Optional() public dialogRef: MatDialogRef<VerficationDialogeComponent>, @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any){}

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
    this.dialogRef.close(true);
  }

}
