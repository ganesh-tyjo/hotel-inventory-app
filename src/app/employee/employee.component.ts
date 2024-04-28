import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',

  // Add service in providers to use separate instance of that service
  //providers: [RoomsService],
})
export class EmployeeComponent {
  constructor(private roomsService: RoomsService) {}

  empName: string = 'John';
}
