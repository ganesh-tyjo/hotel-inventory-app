import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.scss',
})
export class RoomsBookingComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  id!: number;
  // id$: Observable<number> = this.router.params.pipe(
  //   map((param) => param['id'])
  // );

  id$: Observable<string | null> = this.router.paramMap.pipe(
    map((param) => param.get('id'))
  );

  ngOnInit() {
    //this.id = this.router.snapshot.params['id'];
    // this.router.params.subscribe((params) => {
    //   this.id = params['id'];
    // });
  }
}
