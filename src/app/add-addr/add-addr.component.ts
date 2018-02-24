import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FormGroup } from '@angular/forms/src/model';

import { ReceiversService } from '../_service/receivers.service';

@Component({
  selector: 'app-add-addr',
  templateUrl: './add-addr.component.html'
})
export class AddAddrComponent implements OnInit {

  form: FormGroup;
  newUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private receivers: ReceiversService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.route.url.subscribe((url) => {
      if (url.length) {
        const ref = url[url.length - 1].path;

        if (ref === 'add-user') {
          this.newUser = true;
        } else {
          this.newUser = false;
          this.receivers.getReceiver(ref).subscribe((user) => {
            this.form.get('email').disable();
            this.form.get('email').setValue(user.email);
            this.form.get('nickname').setValue(user.nickname);
          });
        }
      }
    });
  }

  addAddr() {
    this.receivers.addReceiver({
      email: this.form.getRawValue()['email'],
      nickname: this.form.value['nickname']
    })
    .subscribe(_ => this.goBack());
  }

  goBack() {
    window.history.back();
  }
  isValid(name: string): boolean {
    const control = this.form.get(name);

    return control.untouched || control.valid;
  }
}
