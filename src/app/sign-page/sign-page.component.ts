import { Component } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html'
})
export class SignPageComponent {

  constructor(
    private auth: AuthService
  ) { }
  logIn(user: string) {
    this.auth.logIn(user);
  }

}
