import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImageCognitiveService {

    constructor(private http: HttpClient) {  }
    

    getPicDetails(imageUrl: string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': environment.cognitiveSubKey
        })
        return this.http.post(environment.cognitiveServicesUrl+'vision/v2.0/analyze?visualFeatures=ImageType,Color,Adult,Faces', {url:imageUrl}, {headers: headers});//&details=Celebrities
    }

}