import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  // Getter
  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: '2', disabled: true },
          { validators: [Validators.required] }
        ),
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: ['', { updateOn: 'blur' }],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidator.ValidateName,
            CustomValidator.ValidateSpecialChar('*'),
          ],
        ],
        address: this.fb.group({
          addressLine1: ['', [Validators.required]],
          addressLine2: [''],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          country: [''],
          zipCode: [''],
        }),
        guests: this.fb.array([this.addGuestControl()]),
        tnc: new FormControl(false, { validators: [Validators.required] }),
      },
      // Custom date validator, but it has problem as it is not considering other form validators hence commented.
      // { updateOn: 'blur', validators: [CustomValidator.ValidateDate] }
      { updateOn: 'blur' }
    );

    this.getBookingData();

    this.bookingForm.valueChanges.subscribe((data) => {
      console.log(data);
    });

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {
    //     console.log(data);
    //   });
    // });

    // RXJS map operators
    // this.bookingForm.valueChanges
    //   .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  removePassport() {
    if (this.bookingForm.get('passport'))
      this.bookingForm.removeControl('passport');
  }

  addGuest() {
    // Dynamically adding form group to existing form array
    this.guests.push(this.addGuestControl());
  }

  private addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: [''],
    });
  }

  removeGuest(index: number) {
    this.guests.removeAt(index);
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());

    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      roomId: '2',
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('16-Jun-2021'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }
}
