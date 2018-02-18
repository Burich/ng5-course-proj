import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addrs',
  templateUrl: './addrs.component.html',
  styleUrls: ['./addrs.component.css']
})
export class AddrsComponent implements OnInit {
  // TODO: определять тип входящие/исходящие и менять содержимое в зависимости от этого
  // TODO: модели, погрузка данных по страницам
  users = [
    {id: 1, author: 'saved name', email: 'his@gmail.com'},
    {id: 2, author: '', email: 'no-name@gmail.com'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
