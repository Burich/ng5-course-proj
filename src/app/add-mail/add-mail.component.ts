import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { LettersService } from '../_service/letters.service';
import { ReceiversService } from '../_service/receivers.service';

import { ReceiverModel } from '../_model/receiver.class';

@Component({
  selector: 'app-add-mail',
  templateUrl: './add-mail.component.html',
  styleUrls: ['./add-mail.component.css']
})
export class AddMailComponent implements OnInit {

  form: FormGroup;
  options: ReceiverModel[] = [];
  filteredOptions: Observable<ReceiverModel[]>;

  constructor(
    private fb: FormBuilder,
    private letters: LettersService,
    private receivers: ReceiversService
  ) { }

  ngOnInit() {
    this.receivers.getAll().subscribe((users) => {
      this.options = users;
    });

    this.form = this.fb.group({
      receiver: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required, Validators.minLength(4)]],
      body: ['']
    });

    this.filteredOptions = this.form.get('receiver').valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(val: string): ReceiverModel[] {
    return this.options.filter(option =>
      (option.email.toLowerCase().includes(val.toLowerCase())
      || (option.nickname && option.nickname.toLowerCase().includes(val.toLowerCase()))
    ));
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

  isValid(name: string): boolean {
    const control = this.form.get(name);

    return control.untouched || control.valid;
  }

}
