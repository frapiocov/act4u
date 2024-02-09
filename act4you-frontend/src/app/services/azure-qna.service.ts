import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from './env.js'

@Injectable({
  providedIn: 'root'
})
export class QnaService {

  constructor(private http: HttpClient) {  }

  sendQuestion(q: string) {
    return this.http.post(env.qnaEndpoint, {"question": q});
  }

}
