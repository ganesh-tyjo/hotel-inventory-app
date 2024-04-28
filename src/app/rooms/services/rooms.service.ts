import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

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

  // $ denotes that it is a stream.
  // stream can not be modified after you subscribe to it. You need to modify it within function. Pipe is example of such function.
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(shareReplay(1));

  getRooms() {
    //const headers = new HttpHeaders({ token: 'kjkjd76as87d678sdf' });
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(roomNumber: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${roomNumber}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      { reportProgress: true }
    );

    return this.http.request(request);
  }
}
