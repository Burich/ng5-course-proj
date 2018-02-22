import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LettersService } from '../_service/letters.service';
import { ReceiversService } from '../_service/receivers.service';

// TODO: Angular Material для стилей, полей ввода и автокомплита

@Component({
  selector: 'app-add-mail',
  templateUrl: './add-mail.component.html',
  styleUrls: ['./add-mail.component.css']
})
export class AddMailComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private letters: LettersService,
    private receivers: ReceiversService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      receiver: ['', [Validators.required]], // TODO: валидатор, проверяющий вхождение в
      // зарегистрированных пользователей, или email!
      // а лучше, чтобы даже по автокомплиту существующих, в поле вводился email
      title: ['', [Validators.required, Validators.minLength(4)]],
      body: ['']
    });
  }

  addMail() {
    const receiver = this.form.value['receiver'];

    this.letters.addLetterTo(
      'outbox',
      this.form.value['title'],
      this.form.value['body'],
      receiver
    ).subscribe(_ => {
      this.receivers.getReceiver(receiver).subscribe((result) => {
        if (!result) {
          this.receivers.addReceiver({email: receiver});
        }

        this.goBack();
      });
    });
  }

  goBack() {
    window.history.back();
  }

}
