import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './common/guards/auth.guard';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', loadChildren:()=>import('./pages/pages.routes').then(x=>x.routes), canActivate:[AuthGuard]},
];
