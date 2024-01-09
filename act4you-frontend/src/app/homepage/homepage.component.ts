import { Component } from '@angular/core';
import { AnnunciComponent } from '../annunci/annunci.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [AnnunciComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
