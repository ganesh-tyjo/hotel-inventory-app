import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './guards/login.guard';
import { roomGuard } from './rooms/guards/room.guard';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'rooms/add',
    component: RoomsAddComponent,
    canActivate: [loginGuard],
  },
  // Nested routing
  {
    path: 'rooms',
    component: RoomsComponent,
    children: [
      {
        path: ':id',
        component: RoomsBookingComponent,
      },
    ],
    // canActivate: [loginGuard],
    // canActivateChild: [roomGuard],
  },
  // Dynamic route
  // {
  //   path: 'rooms/:id',
  //   component: RoomsBookingComponent,
  // },
  {
    path: 'booking',
    component: BookingComponent,
    // canActivate: [loginGuard]
  },
  { path: 'login', component: LoginComponent },
  // Default route
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  // Wild card route
  {
    path: '**',
    component: NotfoundComponent,
  },
];
