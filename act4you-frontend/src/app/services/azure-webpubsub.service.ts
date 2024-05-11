import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {

  constructor() { }

  public connect(): Observable<any> {

    var observable = new Observable<any>((subcriber) => {

      var subject = webSocket(environment.wwsLink)

      subject.subscribe(
        msg => subcriber.next(msg),
        err => console.log(err),
        () => console.log('complete')
      );
    })

    return observable
  }
}