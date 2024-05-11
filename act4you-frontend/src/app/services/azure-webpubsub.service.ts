import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";


@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {

    private wssLink: string = "wss://act4upubsub.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly9hY3Q0dXB1YnN1Yi53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0h1YiIsImlhdCI6MTcxNTQ0NjE0NSwiZXhwIjoxNzE1NDQ5NzQ1fQ.OQdlAnnw-XoxfKYoha3I5E0OML3iN3P_Hg_RFBiNHlI"

  constructor() { }

  public connect(): Observable<any> {

    var observable = new Observable<any>((subcriber) => {

      var subject = webSocket(this.wssLink)

      subject.subscribe(
        msg => subcriber.next(msg),
        err => console.log(err),
        () => console.log('complete')
      );
    })

    return observable
  }
}