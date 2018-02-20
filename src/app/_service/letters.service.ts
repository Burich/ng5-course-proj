import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LetterModel } from '../_model/letter.class';

@Injectable()
export class LettersService {

private lastId = 1;

letters = {
    inbox: [],
    outbox: [],
    spam: [],
};

private template = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
qui officia deserunt mollit anim id est laborum.`;

constructor() {
    for (const folder of ['inbox', 'spam']) {
        for (let i = 0; i < 2 + Math.random() * 5; ++i ) {
            this.addLetterTo(folder, `You have won (${this.lastId})!`, this.generateBody(), 'someone@fake.com');
        }
    }
}

private generateBody(): string {
    const from: number = Math.floor(Math.random() * (this.template.length - 100));
    return this.template.slice(from, from + 100);
}

addLetterTo(folder: string, title: string, body: string, email: string): Observable<LetterModel[]> {
    this.letters[folder].push({
        id: this.lastId++,
        receiver: email,
        title: title,
        body: body
    });

    return Observable.of(this.letters[folder]);
}

getLettersFor(folder: string): Observable<LetterModel[]> {
    return Observable.of(this.letters[folder]);
}

delete(folder: string, ids: number[]): Observable<LetterModel[]> {
    this.letters[folder] =
        this.letters[folder].filter((letter: LetterModel) => !ids.includes(letter.id));

    return Observable.of(this.letters[folder]);
}

}