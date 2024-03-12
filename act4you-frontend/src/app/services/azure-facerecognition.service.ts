import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {

    constructor(private http: HttpClient) {  }
    
    private url = 'https://switzerlandnorth.api.cognitive.microsoft.com/face/v1.0/detect';

    getFace(imageUrl: string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '171bf71884b7428bae7fc616e7b3d56d'
        })
        return this.http.post(this.url, {url:imageUrl}, {headers: headers});
    }

}