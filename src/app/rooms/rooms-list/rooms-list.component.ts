import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
})
export class RoomsListComponent {
  // Decorator to retrieve data from parent component RoomsComponent and use that in current component AKA child component
  @Input() rooms: RoomList[] = [];
}
