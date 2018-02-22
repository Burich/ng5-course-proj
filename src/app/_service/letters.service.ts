import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LetterModel } from '../_model/letter.class';
import { BoxModel } from '../_model/box.class';

@Injectable()
export class LettersService {

private lastId = 1;

letters: LetterModel[] = [];
folders: BoxModel[] = [
    {link: 'inbox', title: 'Входящие'},
    {link: 'outbox', title: 'Отправленные'},
    {link: 'spam', title: 'Спам'},
    {link: 'scan', title: 'Результат поиска'}
];

private template = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
qui officia deserunt mollit anim id est laborum.`;

constructor() {
    for (const folder of this.folders.filter((box) => box.link !== 'scan')) {
        for (let i = 0; i < 2 + Math.random() * 5; ++i ) {
            this.addLetterTo(folder.link, `You have won (${this.lastId})!`, this.generateBody(), 'someone@fake.com');
        }
    }
}

private generateBody(): string {
    const from: number = Math.floor(Math.random() * (this.template.length - 100));
    return this.template.slice(from, from + 100);
}

getFolders(): Observable<BoxModel[]> {
    return Observable.of(this.folders);
}

addLetterTo(folder: string, title: string, body: string, email: string): Observable<LetterModel[]> {
    this.letters.push({
        id: this.lastId++,
        receiver: email,
        title: title,
        body: body,
        box: [folder]
    });

    return this.getLettersFor(folder);
}

getLetterById(id: number) {
    return Observable.of(this.letters.find((letter) => letter.id === id));
}

getLettersFor(folder: string): Observable<LetterModel[]> {
    return Observable.of(this.letters.filter((letter) => letter.box.includes(folder)));
}

delete(folder: string, ids: number[]): Observable<LetterModel[]> {
    this.letters =
        this.letters.filter((letter: LetterModel) => !ids.includes(letter.id));

    return this.getLettersFor(folder);
}

scan(text: string): Observable<LetterModel[]> {
    for (const letter of this.letters) {
        letter.box = letter.box.filter((box) => box !== 'scan');

        if (letter.body.indexOf(text) > -1) {
            letter.box.push('scan');
        }
    }

    return this.getLettersFor('scan');
}

}