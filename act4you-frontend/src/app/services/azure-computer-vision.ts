import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageCognitiveService {

    constructor(private http: HttpClient) {  }
    
    private url = 'https://act4uvision.cognitiveservices.azure.com/';

    getPicDetails(imageUrl: string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '4dc9313d0f9042608a0edc8b00073611'
        })
        return this.http.post(this.url+'vision/v2.0/analyze?visualFeatures=ImageType,Color,Adult', {url:imageUrl}, {headers: headers});//&details=Celebrities
    }

}