import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from './env.js'

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub:any) {
    return this.http.post('/', sub);
}

send() {
    return this.http.post('/', null);
}
  
}
