import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { QnAComponent } from './qn-a/qn-a.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { NewAnnuncioComponent } from './new-annuncio/new-annuncio.component';


const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard],},
  { path: '', component: HomepageComponent },
  { path: 'error', component: HomepageComponent },
  { path: 'qna', component: QnAComponent },
  { path: 'view-applications', component: CandidatureComponent, pathMatch: 'full' },
  { path: 'send-notification', component: SendNotificationComponent, pathMatch: 'full' },
  { path: 'create-announcement', component: NewAnnuncioComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
