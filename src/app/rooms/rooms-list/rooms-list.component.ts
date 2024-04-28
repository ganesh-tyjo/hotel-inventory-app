import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomList } from '../rooms';
import { RouterLink } from '@angular/router';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  imports: [CommonModule, RouterLink, FilterPipe],
})
export class RoomsListComponent implements OnChanges, OnDestroy {
  ngOnDestroy(): void {
    console.log('OnDestroy is called');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title'] && changes['title'].previousValue) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
  // Decorator to retrieve data from parent component RoomsComponent and use that in current component AKA child component
  // Component communication
  @Input() rooms: RoomList[] = [];

  @Input() price = 0;

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
