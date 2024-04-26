import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss',
})
export class RoomsAddComponent {
  constructor(private roomService: RoomsService) {}

  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  };

  successMessage!: string;

  AddRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        price: 0,
        photos: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        rating: 0,
      });
      this.successMessage = 'Room Added Successfully';
    });
  }
}
