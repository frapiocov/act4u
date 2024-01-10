import { Component } from '@angular/core';
import { AnnuncioComponent } from '../annuncio/annuncio.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [AnnuncioComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
