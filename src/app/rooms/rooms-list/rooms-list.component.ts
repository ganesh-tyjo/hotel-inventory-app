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

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() rooms: RoomList[] | null = [];

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
