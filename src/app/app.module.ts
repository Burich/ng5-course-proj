import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignPageComponent } from './sign-page/sign-page.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { AddMailComponent } from './add-mail/add-mail.component';
import { LetterComponent } from './letter/letter.component';
import { AddrsComponent } from './addrs/addrs.component';
import { AddAddrComponent } from './add-addr/add-addr.component';
import { EditAddrComponent } from './edit-addr/edit-addr.component';
import { MailPageComponent } from './mail-page/mail-page.component';
import { AuthService } from './_service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SignPageComponent,
    MailboxComponent,
    AddMailComponent,
    LetterComponent,
    AddrsComponent,
    AddAddrComponent,
    EditAddrComponent,
    MailPageComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
