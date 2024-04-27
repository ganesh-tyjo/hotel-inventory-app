import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverDirective } from '../hover.directive';
import { EmailvalidatorDirective } from '../emailvalidator/emailvalidator.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HoverDirective, EmailvalidatorDirective, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private route: Router) {}

  login() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin')
      // this.route.navigate(['/rooms', 'add']);
      this.route.navigateByUrl('/rooms/add');
  }
}
