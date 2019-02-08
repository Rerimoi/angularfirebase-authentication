import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';

// Import canActivate guard services
import { AuthGuard } from '../../shared/guard/auth.guard';
import { SecureInnerPagesGuard } from '../../shared/guard/secure-inner-pages.guard';

import { AddLecturerCheckinComponent } from '../../components/add-lecturer-checkin/add-lecturer-checkin.component';
import { EditLecturerCheckinComponent } from '../../components/edit-lecturer-checkin/edit-lecturer-checkin.component';
import { LecturerCheckinListComponent } from '../../components/lecturer-checkin-list/lecturer-checkin-list.component';
import { LecturerCheckinViewComponent } from 'src/app/components/lecturer-checkin-view/lecturer-checkin-view.component';
import { LogInComponent } from 'src/app/components/log-in/log-in.component';
import { AdminGuard } from 'src/app/components/admin.guard';
import { CanActivate } from '@angular/router/src/utils/preactivation';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard,AdminGuard]},
  {path:  'log-in', component:LogInComponent, canActivate:[SecureInnerPagesGuard,AdminGuard],},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard,AdminGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  { path: 'add-lecturer-checkin', component: AddLecturerCheckinComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  { path: 'edit-lecturer-checkin/:id', component: EditLecturerCheckinComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  { path: 'view-lecturer-checkin/:id', component: LecturerCheckinViewComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  { path: 'view-lecturer-checkins', component: LecturerCheckinListComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] },
  {path: '**', component: DashboardComponent, canActivate: [SecureInnerPagesGuard,AdminGuard] }  // If no matching route found, go back to dashboard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
