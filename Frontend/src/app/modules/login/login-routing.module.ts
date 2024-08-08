import { RoleManagementComponent } from './components/role-management/role-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: NavbarComponent, data: {breadcrumb: 'Home'},
    children: [
      {path: 'user',  data: {breadcrumb: 'User'}, children: [
        {path: '', component: ViewUserComponent,},
        {path: 'add', component: AddUserComponent, data: {breadcrumb: 'Add'}},
        {path: 'edit/:id', component: AddUserComponent, data: {breadcrumb: 'Edit'}}
      ]},
      {path: 'role',  data: {breadcrumb: 'Role'}, component: RoleManagementComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
