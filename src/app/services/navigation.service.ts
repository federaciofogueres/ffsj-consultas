import { Inject, Injectable } from '@angular/core';
import { WINDOW } from './window.token';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(@Inject(WINDOW) private windowRef: Window) {}

  navigateExternal(url: string) {
    this.windowRef.location.assign(url);
  }
}
