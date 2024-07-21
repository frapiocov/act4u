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

  public getWS(): Observable<any>{
    return this.http.get<any>('https://act4unotification.azurewebsites.net/api/negotiate');
  }
}