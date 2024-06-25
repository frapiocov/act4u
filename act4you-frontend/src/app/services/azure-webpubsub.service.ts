import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {

  constructor(private http: HttpClient) { }

  public connect(link: string): Observable<any> {
    console.log('sono dentro')
    var observable = new Observable<any>((subcriber) => {
      console.log('sono dentro 2')

      var subject = webSocket(link);
      console.log(subject);
      subject.subscribe(
        msg => subcriber.next(msg),
        err => console.log(err),
        () => console.log('complete')
      );
    })

    return observable
  }

  public getWS(): Observable<any>{
    return this.http.get<any>('https://act4unotification.azurewebsites.net/api/negotiate');
  }
}