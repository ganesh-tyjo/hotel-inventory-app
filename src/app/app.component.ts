import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RoomsComponent, RoomsListComponent],
  templateUrl: './app.component.html',
  // OR
  // template: `<h1>Hello there from inline template</h1>
  //   <p>another para</p>`,
  styleUrl: './app.component.scss',
  // OR
  //styles: `h1{color:red}`,
})
export class AppComponent {
  title = 'hotel-inventory-app';

  role: string = 'Admin';
}
