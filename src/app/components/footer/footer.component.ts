import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private cookieService: CookieService
  ) {}

  redireccionar() {
    if (Boolean(this.cookieService.get('href'))) {
      window.location.href = this.cookieService.get('href');
    } else {
      window.location.href = 'https://plenos.hogueras.es';
    }
  }
}