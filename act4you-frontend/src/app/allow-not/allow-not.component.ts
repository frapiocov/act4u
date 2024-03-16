import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from '../services/newsletter.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-allow-not',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './allow-not.component.html',
  styleUrl: './allow-not.component.scss'
})
export class AllowNotComponent {

  constructor(private swPush: SwPush, private news: NewsletterService) { }

  subscribeToNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.vapidPublicKey
    })
      .then(sub => {
        console.log("Notification Subscription: ", sub);
        this.news.addPushSubscriber(sub).subscribe();
      })
      .catch(err => console.error("Could not subscribe to notifications", err));

  }
}
