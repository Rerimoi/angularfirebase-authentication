import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireList, AngularFireObject } from '@angular/fire/database';
// import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  checkin:Observable<any> // Reference to StudentCheckin data list, its an Observable
  
 
  

 
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private firestore: AngularFirestore,
    ) { }


  Getstudents() {
    return this.firestore.collection('student-checkin');
  }
}

