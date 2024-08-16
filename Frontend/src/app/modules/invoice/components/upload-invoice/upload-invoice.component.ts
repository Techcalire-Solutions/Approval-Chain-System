import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../invoice.service';
import { Subscription } from 'rxjs';
import { PerformaInvoice } from '../../models/performa-invoice';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/modules/login/login.service';
import { User } from 'src/app/modules/login/models/user';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent implements OnInit, OnDestroy  {
  url = environment.apiUrl;

  constructor(private invoiceService: InvoiceService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute, private loginServie: LoginService
  ){}

  ngOnDestroy(): void {
    this.invSub?.unsubscribe();
    this.uploadSub?.unsubscribe();
    this.submit?.unsubscribe();
  }

  id!: number;
  ngOnInit(): void {
    this.generateInvoiceNumber()
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.patchdata(this.id);
    }
    this.getKAM();
  }

  kamSub!: Subscription;
  kam: User[] = [];
  getKAM(){
    this.kamSub = this.loginServie.getUserByRole(2).subscribe(user =>{
      this.kam = user;
    });
  }

  piForm = this.fb.group({
    piNo: ['', Validators.required],
    url: ['', Validators.required],
    remarks: [''],
    status: [''],
    kamId: <any>[, Validators.required]
  });

  @ViewChild('form') form!: ElementRef<HTMLFormElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('progressArea') progressArea!: ElementRef<HTMLElement>;
  @ViewChild('uploadArea') uploadArea!: ElementRef<HTMLElement>;

  // ngAfterViewInit() {
  //   this.form.nativeElement.addEventListener('click', () => {
  //     this.fileInput.nativeElement.click();
  //   });

  //   this.fileInput.nativeElement.addEventListener('change', (e: Event) => {
  //     this.uploadFile(e)
  //   });
  // }

  uploadProgress: number | null = null;
  uploadComplete: boolean = false;
  file!: any;
  uploadSub!: Subscription;
  imageUrl!: string;
  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0];

    if (this.file) {
      this.uploadComplete = false; // Set to false to show the progress bar

      let fileName = this.file.name;
      if (fileName.length > 12) {
        const splitName = fileName.split('.');
        fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
      }

      this.uploadSub = this.invoiceService.uploadInvoice(this.file).subscribe({
        next: (invoice) => {
          this.imageUrl = this.url + invoice.fileUrl;
          this.piForm.get('url')?.setValue(invoice.fileUrl);
          this.uploadComplete = true; // Set to true when upload is complete
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.uploadComplete = true; // Set to true to remove the progress bar even on error
        }
      });
    }
  }

  invSub!: Subscription;
  prefix: string = '';
  ivNum: string = '';
  generateInvoiceNumber() {
    this.invSub = this.invoiceService.getPI().subscribe((res: PerformaInvoice[]) => {
      // Check if there are any employees in the array
      if (res.length > 0) {
        const maxId: any = res.reduce((prevMax, inv) => {
          // Extract the numeric part of the employee ID and convert it to a number
          const idNumber = parseInt(inv.piNo.replace(/\D/g, ''), 10);

          this.prefix = this.extractLetters(inv.piNo);

          // Check if the extracted numeric part is a valid number
          if (!isNaN(idNumber)) {
            return idNumber > prevMax ? idNumber : prevMax;
          } else {
            // If the extracted part is not a valid number, return the previous max
            return prevMax;
          }
        }, 0);
        // Increment the maxId by 1 to get the next ID
          console.log(maxId);

          let nextId = maxId + 1;
          const paddedId = `${this.prefix}${nextId.toString().padStart(3, "0")}`;

          this.ivNum = paddedId;

          this.piForm.get('piNo')?.setValue(this.ivNum);
      } else {
        // If there are no employees in the array, set the employeeId to 'EMP001'
        let nextId = 0o1;
        let prefix = "PI-";
        const paddedId = `${prefix}${nextId.toString().padStart(3, "0")}`;

        this.ivNum = paddedId;

        this.piForm.get('piNo')?.setValue(this.ivNum);
      }
    });
  }

  extractLetters(input: string): string {
    // return input.replace(/[^a-zA-Z]/g, "");
    var extractedChars = input.match(/[A-Za-z-]/g);

    // Combine the matched characters into a string
    var result = extractedChars ? extractedChars.join('') : '';

    return result;
  }

  submit!: Subscription;
  onSubmit(){
    this.submit = this.invoiceService.addPI(this.piForm.getRawValue()).subscribe((invoice: any) =>{
      this.snackBar.open(`Performa Invoice ${invoice.piNo} Uploaded succesfully...`,"" ,{duration:3000})
      this.router.navigateByUrl('/home')
    });
  }

  onUpdate(){
    console.log("Ooooooooooooooooooooooooo");

    this.submit = this.invoiceService.addPI(this.piForm.getRawValue()).subscribe((invoice: any) =>{
      console.log(invoice);

      this.snackBar.open(`Performa Invoice ${invoice.piNo} Uploaded succesfully...`,"" ,{duration:3000})
      this.router.navigateByUrl('/home')
    });
  }

  piSub!: Subscription;
  editStatus: boolean = false;
  fileName!: string;
  patchdata(id: number){
    this.editStatus = true;
    this.piSub = this.invoiceService.getPIById(id).subscribe(inv => {
      this.fileName = inv.url
      console.log(this.fileName);

      let remarks = inv.performaInvoiceStatuses.find(s => s.status === inv.status)?.remarks;
      this.piForm.patchValue({piNo: inv.piNo, status: inv.status, remarks: remarks, kamId: inv.kamId})
      if(inv.url != '') this.imageUrl = this.url + inv.url;
      console.log(this.imageUrl);

    });
  }

  clearFileInput() {
    let file = this.fileName
    let id = this.id
    this.invoiceService.deleteInvoice(id, file).subscribe(inv => {
      console.log(inv);
      this.imageUrl = '';
      this.file = '';
    });
  }
}
