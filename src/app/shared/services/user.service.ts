import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, Roles } from "../models/user";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  // roles: Observable<Roles[]>;

  constructor(private firestore: AngularFirestore) {
    // this.user = this.firestore.collection<User>('user').snapshotChanges().pipe(
      // map(actions => actions.map(a => {
      //   const data = a.payload.doc.data() as User;
      //   const id = a.payload.doc.id;
      //   return { id, ...data };
      // }))
    // )
  }

   getUser(){
     return this.user;
   }
}
