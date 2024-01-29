import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AnnuncioComponent } from '../annuncio/annuncio.component';
import { AnnuncioService } from '../annuncio.service';
import { Annuncio } from '../annuncio/annuncio';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [AnnuncioComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  loginDisplay = false;

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

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
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  /* addingAnnuncio = false;
  annunci: any = [];
  selectedAnnuncio: Annuncio;
  constructor(private annuncioService: AnnuncioService) {}

  ngOnInit(): void {
      this.getAnnunci();
      this.selectedAnnuncio = new Annuncio();
  }

  cancel() {
    this.addingAnnuncio = false;
  }

  // elimina un annuncio dalla lista
  deleteAnnuncio(annuncio: Annuncio) {
    this.annuncioService.deleteAnnuncio(annuncio).subscribe(res => {
      this.annunci = this.annunci.filter((h: Annuncio) => h !== annuncio);
    });
  }

  // carica gli annunci dal db
  getAnnunci() {
    return this.annuncioService.getAnnunci().subscribe(annunci => {
      this.annunci = annunci;
    });
  }

  // mostra il form per l'aggiunta di un nuovo annuncio
  enableAddMode() {
    this.addingAnnuncio = true;
  }

  // salva un nuovo annuncio nel db o ne aggiorna le informazioni
  save(annuncio: Annuncio) {
    if (this.addingAnnuncio) {
      this.annuncioService.addAnnuncio(this.selectedAnnuncio).subscribe(annuncio => {
        this.addingAnnuncio = false;
        this.annunci.push(annuncio);
      });
    } else {
      this.annuncioService.updateAnnuncio(this.selectedAnnuncio).subscribe(annuncio => {
        this.addingAnnuncio = false;
      });
    }
  } */
}
