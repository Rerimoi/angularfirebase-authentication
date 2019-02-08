import * as core from '@angular/core';
import { User, Roles} from '../models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@core.Injectable({
  providedIn: 'root'
})

export class AuthService {
  [x: string]: any;
user$:Observable<User>;
   userData:any; // Save logged in user data
  

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: core.NgZone // NgZone service to remove outside scope warning

    
  ) 
  
  
  {
    //get auth data, then get firestore user document //null

    // this.user$ = this.afAuth.authState
    // .switchMap(user=> {
    //   if(user){
    //     return this.afs.doc<User>('users/${user.uid}').valueChanges()
    //   } else{
    //     return Observable.of(null)
    //   }
    // })




    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // obtaining the current user
  //  get currentUserId(): string {
  //    return this.isLoggedIn ? this.userData.uid : '';
  // }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        //  this.SetUserData('user');
        //  this. checkAuthorization(JSON.parse('user'),JSON.parse ('allowedRoles'))
        this.ngZone.run(() => {
          this.router.navigate(['user-profile']);
        
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
       

     
  }
 

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.updateUserData(result.user)
      }).catch((error) => {
        window.alert(error.message);
      })
  }
private updateUserData(user){
  //sets user data to firestore on login
  const userRef: AngularFirestoreDocument<any>=this.afs.doc('users/$(user.uid');
  const data:User={
    uid:user.uid,
    displayName:user.displayName,
    email:user.email,
    emailVerified:user.emailVerified,
    roles: {
      Lecturer:true
    }
  }
  return userRef.set(data, {merge:true})
}

//determines if user has matching roles
private checkAuthorization(user:User,allowedRoles: string[]): boolean{
  if(!user) return false
  for(const role of allowedRoles){
    if(user.roles[role]){
      return true

    }
  }
return false
}

//role authorization
canAddlecturercheckin(_user:User): boolean {
const allowed=['lecturer']
return this.checkAuthorization(_user,allowed)
}
canEditLecturercheckin(_user:User): boolean {
  const allowed=['lecturer']
  return this.checkAuthorization(_user,allowed)
  }
  canDeleteCheckin(_user:User): boolean {
    const allowed=['lecturer']
    return this.checkAuthorization(_user,allowed)
    }
  canViewlecturercheckin(_user:User): boolean {
      const allowed=['student']
      return this.checkAuthorization(_user,allowed)
      }


  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['dashboard']);
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (user !== null && user.emailVerified !== false) ? true : false;
    
    // this.ngZone.run(( ) => {this.router.navigate(['log-in]'])}
     
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run Google auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when log in in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: {
      
        Student: null,
        Admin: null, 
        Lecturer: null
      }
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }



//   isLecturer(user: User): boolean {
//     const allowed = ['Admin', 'Lecturer','Student'];
//     return this.checkAuthorization(user, allowed);
//   }

//   canCreateClassCheckin(user: User): boolean {
//     const allowed = ['Admin', 'Lecturer'];
//     return this.checkAuthorization(user, allowed);
//   }

//   canCreateStudentCheckin(user: User): boolean {
//     const allowed = ['Admin', 'Lecturer'];
//     return this.checkAuthorization(user, allowed);
//   }

//   canReadStudentCheckin(user: User): boolean {
//     const allowed = ['Lecturer', 'Admin', 'Student'];
//     return this.checkAuthorization(user, allowed);
//   }

//   canDeleteClassCheckin(user: User): boolean {
//     const allowed = ['Admin', 'Lecturer'];
//     return this.checkAuthorization(user, allowed);
//   }


//   // determines if user has matching role
//   private checkAuthorization(user: User, Roles: string[]): boolean {
//     if (!user) { return false; }
//     for (const role of Roles) {
//       if (user.roles[role]) {
//         return true;
//       }
//     }
//     return false;
//   }
// }

//   match /posts/{document} {

//   function getRole(role) {
//     return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles[role]
//   }
  
//   allow adddLecturerCheckinComponent: if getRole('Lecturer') == true;
//   allow StudentCheckinComponent: if getRole('student') == true;
//   // allow create, delete: if getRole('admin') == true;

// }
// match /users/{document} {

//   function getRole(role) {
//     return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles[role]
//   }

//   allow StudentCheckinComponent;
//   allow AddLecturerCheckinComponent: if request.resource.data.roles.keys().hasAny(['Lecturer']) == true;
//   allow EditLecturerCheckinComponent: if getRole('Lecturer') == true;
// }



  
 
}