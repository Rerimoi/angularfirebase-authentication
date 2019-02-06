import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



// Reactive Form
import { ReactiveFormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent} from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment'

import { AuthService } from './shared/services/auth.service';
import { AddLecturerCheckinComponent } from './components/add-lecturer-checkin/add-lecturer-checkin.component';
import { EditLecturerCheckinComponent } from './components/edit-lecturer-checkin/edit-lecturer-checkin.component';
import { LecturerCheckinListComponent } from './components/lecturer-checkin-list/lecturer-checkin-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LecturerCheckinViewComponent } from './components/lecturer-checkin-view/lecturer-checkin-view.component';
// import { LogInComponent } from './log-in/log-in.component';
import { from } from 'rxjs';




@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AddLecturerCheckinComponent,
    EditLecturerCheckinComponent,
    LecturerCheckinListComponent,
    LecturerCheckinViewComponent,
    LogInComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    ReactiveFormsModule,        // Reactive forms module
    AppRoutingModule,           // Main routing module
    BrowserAnimationsModule,    // Required animations module for Toastr
    ToastrModule.forRoot({      // Register NgxToast NPM module
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule  // NGX pagination module
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
