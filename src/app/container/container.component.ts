import { AfterContentInit, Component, ContentChild, Host } from '@angular/core';
import { RoomsComponent } from '../rooms/rooms.component';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  //providers: [RoomsService],
})
export class ContainerComponent implements AfterContentInit {
  //constructor(@Host() private roomsService: RoomsService) {}

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  ngAfterContentInit(): void {
    this.employee.empName = 'Harry';
  }
}
