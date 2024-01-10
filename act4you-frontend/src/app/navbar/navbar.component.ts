import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, UserLoginComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  //TODO valorizzare in base al tipo non loggato (undefined), user, admin
  userType: string | undefined;

 constructor() {}

}