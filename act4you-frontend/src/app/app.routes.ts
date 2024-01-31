import { Routes } from '@angular/router';
import { QnAComponent } from './qn-a/qn-a.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { NewAnnuncioComponent } from './new-annuncio/new-annuncio.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent},
    { path: 'qna', component: QnAComponent},
    { path: 'view-applications', component: CandidatureComponent, pathMatch: 'full' },
    { path: 'send-notification', component: SendNotificationComponent, pathMatch: 'full' },
    { path: 'create-announcement', component: NewAnnuncioComponent, pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent},
    { path: 'login', component: LoginComponent}
];
