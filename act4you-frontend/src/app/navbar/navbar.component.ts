import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

 isCollapsed = true;

 links = [
    { title: 'QnA (per utente)', link: '/qna' },
    { title: 'Invia notifica(admin)', link: '/send-notification' },
    { title: 'Vedi candidature(admin)', link: '/view-applications' },
    { title: 'Crea annuncio(admin)', link: '/create-announcement' }
  ];

 constructor() { }

}