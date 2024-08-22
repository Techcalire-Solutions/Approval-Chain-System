import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '@services/users.service';

import { Settings, SettingsService } from '@services/settings.service';
import { MatDialog } from '@angular/material/dialog';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { UserDialogComponent } from '../users/user-dialog/user-dialog.component';
import { Role } from '../../common/interfaces/role';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [ 
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    NgxPaginationModule,
    PipesModule,
    DatePipe,  
    UserDialogComponent
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [UsersService]
})
export class RoleComponent implements OnInit {
  public role: Role[] | null;
  public searchText: string;
  public page:any;
  public settings: Settings;
  constructor(public settingsService: SettingsService, 
              public dialog: MatDialog,
              public usersService: UsersService){
    this.settings = this.settingsService.settings; 
  }

  ngOnInit() {
    this.getUsers();         
  }
users :any;
  public getUsers(): void {
    this.role = null; 
    // this.usersService.getUsers().subscribe(role => this.role = role);    
  }
  public addUser(user:Role){
    // this.usersService.addUser(user).subscribe(user => this.getUsers());
  }
  public updateUser(user:Role){
    // this.usersService.updateUser(user).subscribe(user => this.getUsers());
  }
  public deleteUser(user:Role){
    this.usersService.deleteUser(user.id).subscribe(user => this.getUsers());
  }


  public onPageChanged(event: any){
    this.page = event;
    this.getUsers();
    if(this.settings.fixedHeader){      
        document.getElementById('main-content')!.scrollTop = 0;
    }
    else{
        document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
    }
  }

  public openUserDialog(user: any){
    let dialogRef = this.dialog.open(UserDialogComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(user => {
      if(user){
          (user.id) ? this.updateUser(user) : this.addUser(user);
      }
    });
  }

}