import { Component, OnInit } from '@angular/core';
import { LettersService } from '../_service/letters.service';
import { Router } from '@angular/router';

import { BoxModel } from '../_model/box.class';

@Component({
  selector: 'app-mail-page',
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.css']
})
export class MailPageComponent implements OnInit {

  boxes: BoxModel[] = [];

  constructor(
    private letters: LettersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.letters.getFolders().subscribe((folders) => {
      this.boxes = folders;
    });
  }

  findLetters(text: string) {
    this.letters.scan(text).subscribe(_ => this.router.navigateByUrl('/mail/scan'));
  }
}
