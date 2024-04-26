import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';

export const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  { path: 'rooms/add', component: RoomsAddComponent },
  // Dynamic route
  {
    path: 'rooms/:id',
    component: RoomsBookingComponent,
  },
  // Default route
  {
    path: '',
    component: RoomsComponent,
    pathMatch: 'full',
  },
  // Wild card route
  {
    path: '**',
    component: NotfoundComponent,
  },
];
