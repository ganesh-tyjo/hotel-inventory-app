import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig) {
    console.log(config.apiEndpoint);
    console.log('Rooms service initialized.');
  }

  roomList: RoomList[] = [
    {
      roomNumber: 1,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    },
    {
      roomNumber: 2,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 1000,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 3.2,
    },
    {
      roomNumber: 3,
      roomType: 'Private Suite',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 15000,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 2.1,
    },
  ];

  getRooms() {
    return this.roomList;
  }
}
