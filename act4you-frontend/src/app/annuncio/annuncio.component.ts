import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Annuncio } from './annuncio.model';

@Component({
  selector: 'app-annuncio',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './annuncio.component.html',
  styleUrl: './annuncio.component.scss'
})
export class AnnuncioComponent {
  
  @Input() ann: Annuncio;

}