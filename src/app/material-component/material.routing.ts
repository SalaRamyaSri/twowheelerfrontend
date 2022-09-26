import { Routes } from '@angular/router';
import { BookingsComponent } from '../bookings/bookings.component';
import { CustomersComponent } from '../customers/customers.component';
import { FeedbacksComponent } from '../feedbacks/feedbacks.component';
import { ReportsComponent } from '../reports/reports.component';
import { RouteGuardService } from '../services/route-guard.service';
import { BikesComponent } from './bikes/bikes.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { VariantsComponent } from './variants/variants.component';



export const MaterialRoutes: Routes = [
    {
        path: 'company',
        component: ManageCategoryComponent,
        // canActivate:[RouteGuardService],
        // data:{
        //     expectedRole:['admin']
        // }
    },
    {
        path: 'variant',
        component: VariantsComponent,
        // canActivate:[RouteGuardService],
        // data:{
        //     expectedRole:['admin']
        // }
    },
    {
        path: 'bike',
        component: BikesComponent,
        // canActivate:[RouteGuardService],
        // data:{
        //     expectedRole:['admin']
        // }
    },
    {
        path: 'customer',
        component: CustomersComponent,
        // canActivate:[RouteGuardService],
        // data:{
        //     expectedRole:['admin']
        // }
    },
    {
        path: 'booking',
        component: BookingsComponent,
        // canActivate:[RouteGuardService],
        // data:{
        //     expectedRole:['admin']
        // }
    },
    {
        path: 'feedback',
        component: FeedbacksComponent,
        // canActivate:[RouteGuardService],
        // data:{
        //     expectedRole:['admin']
        // }
    },
    {
        path: 'report',
        component: ReportsComponent,
        // canActivate:[RouteGuardService],
        // data:{
        //     expectedRole:['admin']
        // }
    }
];
