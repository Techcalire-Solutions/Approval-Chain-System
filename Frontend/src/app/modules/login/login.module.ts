import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeleteComponent } from './components/delete/delete.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSettingsComponent } from './components/register-settings/register-settings.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
      AttendanceComponent,
      DashboardComponent,
      DeleteComponent,
      LoginComponent,
      LogoutComponent,
      NavbarComponent,
      RegisterComponent,
      RegisterSettingsComponent,
      RoleManagementComponent,
      UserManagementComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ]
})
export class LoginModule { }
