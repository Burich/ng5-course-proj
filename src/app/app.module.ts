import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignPageComponent } from './sign-page/sign-page.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { AddMailComponent } from './add-mail/add-mail.component';
import { LetterComponent } from './letter/letter.component';
import { AddrsComponent } from './addrs/addrs.component';
import { AddAddrComponent } from './add-addr/add-addr.component';
import { MailPageComponent } from './mail-page/mail-page.component';

import { AuthService } from './_service/auth.service';
import { LettersService } from './_service/letters.service';
import { ReceiversService } from './_service/receivers.service';

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
    MailPageComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    LettersService,
    ReceiversService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
