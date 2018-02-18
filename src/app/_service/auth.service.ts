import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

private _user = '';

constructor(
    private router: Router
) { }

isLogged(): boolean {
    return this._user.length > 0;
}

logIn(user: string) {
    this._user = user;
    this.router.navigateByUrl('/mail');
}

get user(): string {
    return this._user;
}

}