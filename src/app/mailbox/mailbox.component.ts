import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { LetterModel } from '../_model/letter.class';

import { LettersService } from '../_service/letters.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  form: FormGroup;

  letters: LetterModel[] = [];
  canDelete = false;

  constructor(
    private route: ActivatedRoute,
    private letterService: LettersService,
    private fb: FormBuilder
  ) {
    route.url.subscribe((url) => {
      this.letterService.getLettersFor(url.join('')).subscribe((letters) => {
        this.letters = letters;
        this.buildForm();
      });
    });
  }

  ngOnInit() {
  }

  buildForm() {
    const letters = [];
    for (const letter of this.letters) {
      letters.push(this.fb.group({
        selected: false,
        id: letter.id
      }));
    }
    this.form = this.fb.group({
      letters: this.fb.array(letters)
    });

    this.form.valueChanges.subscribe((values) => {
      let canDelete = false;
      for (const value of values['letters']) {
        if (value['selected']) {
          canDelete = true;
          break;
        }
      }
      this.canDelete = canDelete;
    });
  }

  setCheckBoxValues(value: boolean) {
    for (const letter of (this.form.get('letters') as FormArray).controls) {
      letter.setValue(Object.assign(letter.value, {selected: value}));
    }
  }

  deleteSelected() {
    const arr = this.form.get('letters') as FormArray;
    const selected: number[] = [];
    for (let i = arr.length - 1; i >= 0; --i) {
      const value = arr.at(i).value;
      if (value['selected']) {
        selected.push(value['id']);
        arr.removeAt(i);
      }
    }

    for (const index of selected.sort().reverse()) {
      arr.removeAt(index);
    }

    this.canDelete = false;
    this.letterService.delete(this.route.snapshot.url.join(''), selected)
      .subscribe((letters) => {
        this.letters = letters;
      });
  }

}
