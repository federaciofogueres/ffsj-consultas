import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FfsjLoginComponent } from 'ffsj-web-components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FfsjLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private router: Router
  ) {}

  manageLogin(event: any) {
    console.log('Login event:', event);
    if (event) {
      console.log('Login successful');
      this.router.navigateByUrl('/home');
    } else {
      console.log('Login failed');
    }
  }

}
