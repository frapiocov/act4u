import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { WebsocketConnectionService } from './services/azure-webpubsub.service';
import { ToastrService } from './services/notificationmodalservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  showToast: boolean = false;
  message: any;

  constructor(private service: WebsocketConnectionService,
    private toastr: ToastrService
  ){

  }

  ngOnInit(): void {
    //this.toastr.showToast('Messaggio di test');
    this.service.getWS().subscribe((msg)=>{
      console.log('eccolooo', msg)
      
      let ws = new WebSocket(msg.url);
      ws.onopen = () => console.log('connected');

      ws.onmessage = event => {
        this.showToast = true;
        this.toastr.showToast('Messaggio di test');
        console.log('eccoloooo', event.data)
      };
    })
  }

  goToast(){

  }

  closeToast(){
    this.showToast = false;
  }
}
