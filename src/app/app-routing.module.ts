import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HomepageComponent } from './cafe/homepage/homepage.component';
import { SidemenuComponent } from './cafe/sidemenu/sidemenu.component';
import { RouteGaurdService } from './service/route-gaurd.service';
import { CategoryComponent } from './cafe/category/category.component';
import { DashboardComponent } from './cafe/dashboard/dashboard.component';
import { ProductMComponent } from './cafe/product-m/product-m.component';
import { ManageUserComponent } from './cafe/manage-user/manage-user.component';
import { ReportComponent } from './cafe/report/report.component';
import { BillComponent } from './cafe/bill/bill.component';

const routes: Routes = [
  {path:"",component:HomepageComponent},
 { path:"home",component:HomepageComponent},
  {path:"dashboard",component:SidemenuComponent, children:[
    {path:"",component:DashboardComponent ,canActivate: [RouteGaurdService], data: { roles: ['user', 'admin']}},
    {path:"category",component:CategoryComponent, canActivate: [RouteGaurdService], data: { roles: ['user', 'admin']}},
    {path:"product",component:ProductMComponent, canActivate: [RouteGaurdService], data: { roles: ['user', 'admin']}},
    {path:"user",component:ManageUserComponent, canActivate: [RouteGaurdService], data: { roles: ['user', 'admin']}},
    {path:"report",component:ReportComponent, canActivate: [RouteGaurdService], data: { roles: ['user', 'admin']}},
    {path:"bill",component:BillComponent, canActivate: [RouteGaurdService], data: { roles: ['user', 'admin']}}
  ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[RouteGaurdService]
})
export class AppRoutingModule { }
