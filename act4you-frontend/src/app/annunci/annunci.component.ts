import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { AnnuncioComponent } from '../annuncio/annuncio.component';

@Component({
  selector: 'app-annunci',
  standalone: true,
  imports: [MatGridListModule, AnnuncioComponent],
  templateUrl: './annunci.component.html',
  styleUrl: './annunci.component.scss'
})
export class AnnunciComponent {

}
