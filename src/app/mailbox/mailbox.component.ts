import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {

  // TODO: определять тип входящие/исходящие и менять содержимое в зависимости от этого
  // TODO: модели, погрузка данных по страницам
  letters = [
    {id: 1, author: 'saved name', title: 'some title'},
    {id: 2, author: 'no-name@gmail.com', title: 'another title'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
