import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { WebsocketConnectionService } from './services/azure-webpubsub.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private service: WebsocketConnectionService){

  }
  ngOnInit(): void {
    this.service.connect()
                .subscribe((msg)=>{
                  console.log(msg)
                })
  }

  //cred = new AzureKeyCredential("fltp0pQ8cmMnpdWTToNSvmVe5EY4cSOSPU5ecyYFiAg=");
  endpoint = "Endpoint=https://act4upubsub.webpubsub.azure.com;AccessKey=fltp0pQ8cmMnpdWTToNSvmVe5EY4cSOSPU5ecyYFiAg=;Version=1.0;"
  
  async subscribeNotification() {

    /*const serviceClient = new WebPubSubServiceClient(this.endpoint, this.cred, 'pubsub');
    let token = await serviceClient.getClientAccessToken();
    let ws = new WebSocket(token.url);
    ws.onmessage = function (e) {
      var server_message = e.data;
    }*/
  };

}
