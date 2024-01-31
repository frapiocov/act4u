import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-annuncio',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule,MatInputModule, MatSelectModule,],
  templateUrl: './new-annuncio.component.html',
  styleUrl: './new-annuncio.component.scss'
})
export class NewAnnuncioComponent {
  
}
