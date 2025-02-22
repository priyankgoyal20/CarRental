import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { AdminAuthGuard } from './gaurds/Auth.guard';
import { AdminComponent } from './components/admin/admin/admin.component';

export const routes: Routes = [
  {
    path: 'car-list/:id',
    loadComponent: () =>
      import('./components/car-list/car-list.component').then(
        (c) => c.CarListComponent
      ),
  },
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    component: UserdashboardComponent,
  },
  { path: 'admin', component: AdminComponent },
  {
    path: 'car-detail/:cityid/:carid',
    loadComponent: () =>
      import('./components/cardetail/cardetail.component').then(
        (c) => c.CardetailComponent
      ),
    canActivate: [AdminAuthGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
