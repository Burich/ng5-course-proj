import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ReceiverModel } from '../_model/receiver.class';

@Injectable()
export class ReceiversService {

receivers: ReceiverModel[] = [
    {email: 'his@gmail.com', nickname: 'saved name'},
    {email: 'no-name@gmail.com'}
];

constructor() { }

addReceiver(receiver: ReceiverModel): Observable<ReceiverModel[]> {
    const exist = this.receivers.find((res) => {
        return res.email === receiver.email;
    });

    if (!!exist) {
        exist.nickname = receiver.email;
    } else {
        this.receivers.push(receiver);
    }

    return this.getAll();
}

getAll(): Observable<ReceiverModel[]> {
    return Observable.of(this.receivers);
}

delete(emails: string[]): Observable<ReceiverModel[]> {
    this.receivers =
        this.receivers.filter((res: ReceiverModel) => !emails.includes(res.email));

    return this.getAll();
}

}