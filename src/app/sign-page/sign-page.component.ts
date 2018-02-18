import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.css']
})
export class SignPageComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  // TODO: требования для имени пользователя и пароля, обработка как реактивно формы
  ngOnInit() {
  }

  logIn(user: string) {
    this.auth.logIn(user);
  }

}
