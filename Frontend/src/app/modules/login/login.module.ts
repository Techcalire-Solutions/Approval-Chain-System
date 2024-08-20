import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeleteComponent } from './components/delete/delete.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { TrailComponent } from './components/trail/trail.component';


@NgModule({
  declarations: [
      AttendanceComponent,
      DashboardComponent,
      DeleteComponent,
      LoginComponent,
      LogoutComponent,
      NavbarComponent,
      AddUserComponent,
      ViewUserComponent,
      RoleManagementComponent,
      TrailComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ]
})
export class LoginModule { }
