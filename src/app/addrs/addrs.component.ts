import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addrs',
  templateUrl: './addrs.component.html',
  styleUrls: ['./addrs.component.css']
})
export class AddrsComponent implements OnInit {
  users = [
    {author: 'saved name', email: 'his@gmail.com'},
    {author: '', email: 'no-name@gmail.com'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
