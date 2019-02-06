import { Injectable } from '@angular/core';
// import { StudentCheckin } from './student-checkin';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebaseApp from 'firebase/app';
import * as geofirex from 'geofirex';

@Injectable({
  providedIn: 'root'
})
export class StudentCheckinService {
  geo = geofirex.init(firebaseApp);
  constructor(private firestore: AngularFirestore) { }

  Addcheckin(checkin: any) {
    checkin.timestamp = new Date();
    const point = this.geo.point(checkin.location.latitude, checkin.location.longitude);
    checkin.location = point.data;
    return this.firestore.collection('student-checkin').add(checkin);
  }
}
