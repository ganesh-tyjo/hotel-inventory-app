import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoggerService } from './logger.service';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { LocalStorageToken } from './localstorage.token';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RoomsComponent,
    RoomsListComponent,
    HeaderComponent,
    ContainerComponent,
    EmployeeComponent,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
  ],
  templateUrl: './app.component.html',
  // OR
  // template: `<h1>Hello there from inline template</h1>
  //   <p>another para</p>`,
  styleUrl: './app.component.scss',
  // OR
  //styles: `h1{color:red}`,
})
export class AppComponent implements OnInit {
  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage
  ) {}

  title = 'hotel-inventory-app';

  role: string = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(): void {
    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerHTML = '<h1>Hilton Hotel</h1>';
    this.localStorage.setItem('name', 'Hilton Hotel');
  }

  /*
  Dynamic component rendering
  ViewChild is a Decorator
  user is selector which we defined in ng-template tag with #.
  ViewContainerRef will render component dynamically.
  */
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //   // Dynamically render RoomsComponent
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 20;
  // }
}
