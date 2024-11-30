import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './authenication/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo : 'auth',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component : SearchComponent
    },
    {
        path:'booking',
        component: BookingComponent
    },
    {
        path : 'auth',
         component : LoginComponent
    }
 
];
