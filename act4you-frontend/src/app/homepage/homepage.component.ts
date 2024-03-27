import { Component, OnInit } from '@angular/core';
import { AnnuncioComponent } from '../annuncio/annuncio.component';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CosmosDBService } from '../services/azure-cosmosdb.service';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [AnnuncioComponent, MatIconModule, NgFor, NgIf, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  loginDisplay = false;
  annunci: any[] = [];

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private annService: CosmosDBService) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        this.setLoginDisplay();
      });
    this.setLoginDisplay();
    this.getAnnunci();
  }

  async getAnnunci() {
    this.annunci = await this.annService.getAnnunci();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

}
