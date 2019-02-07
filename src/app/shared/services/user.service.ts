import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, Roles } from "../models/user";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  // roles: Observable<Roles[]>;

  constructor(private afs: AngularFirestore) {
    this.user = this.afs.collection('user').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    )
  }
  
   getUser(){
     return this.user;
   }
}