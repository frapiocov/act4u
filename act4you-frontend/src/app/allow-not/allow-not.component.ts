import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-allow-not',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './allow-not.component.html',
  styleUrl: './allow-not.component.scss'
})
export class AllowNotComponent {

  constructor(private swPush: SwPush) { }

  subscribeToNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.vapidPublicKey
    })
      .then(sub => {
        console.log("Notification Subscription: ", sub);
       
      })
      .catch(err => console.error("Could not subscribe to notifications", err));

  }
}
