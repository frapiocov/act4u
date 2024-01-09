import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-annuncio',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './annuncio.component.html',
  styleUrl: './annuncio.component.scss'
})
export class AnnuncioComponent {

}
