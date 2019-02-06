import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReportsComponent } from 'src/app/components/reports/reports.component';




@Injectable({
  providedIn: 'root'
})
export class ReportsService {
 
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private firestore: AngularFirestore,
    public reports: ReportsComponent,
    public studentCheckin) { }

  Getstudents(id) {
    return this.firestore.collection('student-checkin').doc(id);
  }
}

