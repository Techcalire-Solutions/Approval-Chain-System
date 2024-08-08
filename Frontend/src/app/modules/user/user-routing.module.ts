import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from '../login/components/view-user/view-user.component';
import { AddUserComponent } from '../login/components/add-user/add-user.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
