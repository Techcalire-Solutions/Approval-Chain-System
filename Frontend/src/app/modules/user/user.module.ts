import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from '../login/components/add-user/add-user.component';
import { ViewUserComponent } from '../login/components/view-user/view-user.component';
import { MaterialModule } from '../login/material/material.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
