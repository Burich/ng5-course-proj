import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { SignPageComponent } from './sign-page/sign-page.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { AddMailComponent } from './add-mail/add-mail.component';
import { LetterComponent } from './letter/letter.component';
import { AddrsComponent } from './addrs/addrs.component';
import { AddAddrComponent } from './add-addr/add-addr.component';
import { MailPageComponent } from './mail-page/mail-page.component';

import { AuthGuardService } from './_service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/mail/inbox', pathMatch: 'full'},
  {path: 'signin', component: SignPageComponent},
  {path: 'mail/new', component: AddMailComponent, canActivate: [AuthGuardService]},
  {path: 'mail/letter/:id', component: LetterComponent, canActivate: [AuthGuardService]},
  {path: 'mail/add-user', component: AddAddrComponent, canActivate: [AuthGuardService]},
  {path: 'mail/users/:email', component: AddAddrComponent, canActivate: [AuthGuardService]},
  {path: 'mail', component: MailPageComponent, canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {path: '', redirectTo: '/mail/inbox', pathMatch: 'full'},
      {path: 'users', component: AddrsComponent},
      {path: ':box', component: MailboxComponent}
    ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
