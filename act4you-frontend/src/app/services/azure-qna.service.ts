import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectLine } from 'botframework-directlinejs';
import { env } from './env.js'

@Injectable({
  providedIn: 'root'
})
export class QnaService {

  directLine = new DirectLine({ secret: env.qnaBotKey });

  constructor(private http: HttpClient) { }

  sendQuestion(q: string) {

    this.directLine.postActivity({
      from: { id: env.tenantId }, // required
      type: 'message',
      text: q,
    }).subscribe(
      /* id => console.log('Posted activity with id', id),
      error => console.log('Error posting activity', error) */
    );

    // Ricevi le risposte dal bot
    this.directLine.activity$
      .filter(activity => activity.type === 'message')
      .subscribe(
        responseActivity => {
          const responseText = responseActivity; // Accedi al testo della risposta
          console.log('Bot response:', responseText);
        },
        error => {
          console.log('Error receiving activity:', error);
        }
      );
  }
}
