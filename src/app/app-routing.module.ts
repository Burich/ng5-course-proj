import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/mail/inbox', pathMatch: 'full'},
  {path: 'signin', component: NotFoundComponent},
  {path: 'mail', redirectTo: '/mail/inbox', pathMatch: 'full'},
  {path: 'mail/inbox', component: NotFoundComponent},
  {path: 'mail/outox', component: NotFoundComponent},
  {path: 'mail/new', component: NotFoundComponent},
  {path: 'mail/letter/:id', component: NotFoundComponent},
  {path: 'mail/users', component: NotFoundComponent},
  {path: 'mail/users/new', component: NotFoundComponent},
  {path: 'mail/users/:id', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
