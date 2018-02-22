import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LetterModel } from '../_model/letter.class';
import { LettersService } from '../_service/letters.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {

  letter: LetterModel;

  constructor(
    private route: ActivatedRoute,
    private letterService: LettersService
  ) { }

  ngOnInit() {
    this.route.url.subscribe((url) => {
      if (url.length) {
        const id = url[url.length - 1].path;
        this.letterService.getLetterById(Number.parseInt(id, 10)).subscribe((letter) => {
          this.letter = letter;
        });
      }
    });
  }

  goBack() {
    window.history.back();
  }

}
