import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(config.apiEndpoint);
    console.log('Rooms service initialized.');
  }

  roomList: RoomList[] = [];

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }
}
