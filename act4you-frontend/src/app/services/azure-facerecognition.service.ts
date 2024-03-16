import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {

    constructor(private http: HttpClient) {  }

    getFace(imageUrl: string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': environment.faceRecognitionKey
        })
        return this.http.post(environment.faceRecognitionUrl, {url:imageUrl}, {headers: headers});
    }

}