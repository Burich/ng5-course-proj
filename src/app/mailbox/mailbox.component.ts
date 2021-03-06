import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { LetterModel } from '../_model/letter.class';
import { ReceiverModel } from '../_model/receiver.class';

import { LettersService } from '../_service/letters.service';
import { ReceiversService } from '../_service/receivers.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent {
  form: FormGroup;

  canDelete = false;

  letters: LetterModel[] = [];
  receivers: ReceiverModel[] = [];

  columns: string[] = ['select', 'user', 'title'];

  constructor(
    private route: ActivatedRoute,
    private letterService: LettersService,
    private receiverService: ReceiversService,
    private router: Router,
    private fb: FormBuilder
  ) {
    route.url.subscribe((url) => {
      Promise.all([
        this.letterService.getLettersFor(url.join('')).toPromise(),
        this.receiverService.getAll().toPromise()
      ]).then(([letters, receivers]) => {
        this.letters = letters;
        this.receivers = receivers;
        this.buildForm();
      });
    });
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
    this.canDelete = false;
    this.letterService.delete(this.route.snapshot.url.join(''), selected)
      .subscribe((letters) => {
        this.letters = letters;
      });
  }

  nickname(email: string) {
    const nick = this.receivers.find((user) => user.email === email);
    if (nick && nick.nickname) {
      return nick.nickname;
    } else {
      return email;
    }
  }

}
