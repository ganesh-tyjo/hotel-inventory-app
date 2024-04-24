import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RoomsListComponent, HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
  // Dependency Injection, Service is injected
  constructor(@SkipSelf() private roomService: RoomsService) {}

  ngAfterViewChecked(): void {
    //this.headerComponent.title = 'Rooms View';
  }

  ngAfterViewInit(): void {
    /*
    After running below code you will get ExpressionChangedAfterItHasBeenCheckedError.
    It is totally normal if you get this code in development mode.
    But if you get this error in production mode then you can not ignore it.
    The reason of getting this error in development mode is Angular is checking this twice
    */
    this.headerComponent.title = 'Rooms View';

    // Did not understand use of ViewChildren Decorator
    // this.headerComponentChildren.last.title = 'Last Title';
  }
  // Lifecycle hook
  ngDoCheck(): void {
    /*
    this will get called for any event which is triggered in current page.
    Do not use ngDoCheck and ngOnChanges on same component as they will be doing exact same thing.
    */
    //console.log('On changes is called');
  }

  totalBytes: number = 0;
  subscription!: Subscription;
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();

  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomService.getRooms$.pipe(map((rooms) => rooms.length));

  // Lifecycle hook
  ngOnInit(): void {
    // console.log(this.headerComponent);

    this.roomService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Request success');
          break;
        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          break;
        case HttpEventType.Response:
          console.log(event.body);
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });

    // this.roomService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
  }

  // @ViewChild(HeaderComponent, { static: true })
  // headerComponent!: HeaderComponent;
  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  // Did not understand use of ViewChildren Decorator
  // @ViewChildren(HeaderComponent)
  // headerComponentChildren!: QueryList<HeaderComponent>;

  hotelName: string = 'Hilton Hotel';
  numberOfRooms: number = 25;
  toggleRooms: boolean = true;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title: string = 'Room List';

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  roomList: RoomList[] = [];

  selectedRoom!: RoomList;

  toggle() {
    this.toggleRooms = !this.toggleRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 1500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 2.9,
    };

    /*
    Below code can not work after change detection strategy is defined.
    roomList variable is passed to child component rooms-list.
    we need to reassign value to the roomList variable.
    */
    //this.roomList.push(room);

    // [...oldArray, newItem] new way to append value to existing array
    //this.roomList = [...this.roomList, room];

    this.roomService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room 1',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 2500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.6,
    };

    this.roomService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  // ngOnDestroy() {
  //   if (this.subscription) this.subscription.unsubscribe();
  // }
}
