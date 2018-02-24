import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { ReceiverModel } from '../_model/receiver.class';

import { ReceiversService } from '../_service/receivers.service';

@Component({
  selector: 'app-addrs',
  templateUrl: './addrs.component.html',
  styleUrls: ['./addrs.component.css']
})
export class AddrsComponent {
  form: FormGroup;

  receivers: ReceiverModel[] = [];
  canDelete = false;

  columns: string[] = ['select', 'email', 'nickname'];

  constructor(
    private receiversService: ReceiversService,
    private fb: FormBuilder
  ) {
    this.receiversService.getAll().subscribe((users) => {
      this.receivers = users;
      this.buildForm();
    });
  }

buildForm() {
  const users = [];
  for (const user of this.receivers) {
    users.push(this.fb.group({
      selected: false,
      email: user.email
    }));
  }
  this.form = this.fb.group({
    users: this.fb.array(users)
  });

  this.form.valueChanges.subscribe((values) => {
    let canDelete = false;
    for (const value of values['users']) {
      if (value['selected']) {
        canDelete = true;
        break;
      }
    }
    this.canDelete = canDelete;
  });
}

setCheckBoxValues(value: boolean) {
  for (const user of (this.form.get('users') as FormArray).controls) {
    user.setValue(Object.assign(user.value, {selected: value}));
  }
}

deleteSelected() {
  const arr = this.form.get('users') as FormArray;
  const selected: string[] = [];

  for (let i = arr.length - 1; i >= 0; --i) {
    const value = arr.at(i).value;
    if (value['selected']) {
      selected.push(value['email']);
      arr.removeAt(i);
    }
  }

  this.canDelete = false;
  this.receiversService.delete(selected)
    .subscribe((users) => {
      this.receivers = users;
    });
}

}
