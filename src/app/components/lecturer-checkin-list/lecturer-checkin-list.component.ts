import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { LecturerCheckinService } from 'src/app/shared/services/lecturer-checkin.service';
import { LecturerCheckin } from 'src/app/shared/services/lecturer-checkin';
import { DocumentChangeAction, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
 
@Component({
  selector: 'app-lecturer-checkin-list',
  templateUrl: './lecturer-checkin-list.component.html',
  styleUrls: ['./lecturer-checkin-list.component.css']
})
export class LecturerCheckinListComponent implements OnInit {
  public get afs(): AngularFirestore {
    return this._afs;
  }
  public set afs(value: AngularFirestore) {
    this._afs = value;
  }

  postRef:AngularFirestoreDocument<any>;
  post$:Observable<any>;
  user:User;

  p = 1;                      // Fix for AOT compilation error for NGX pagination
  LecturerCheckin: LecturerCheckin[];                 // Save checkins data in checkin's array.
  hideWhenNocheckin = false; // Hide checkins data table when no checkin.
  noData = false;            // Showing No checkin Message, when no checkin in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)


  constructor(
    public crudApi: LecturerCheckinService, // Inject checkin CRUD services in constructor.
    public toastr: ToastrService, // Toastr service for alert message
    private _afs: AngularFirestore, public auth:AuthService){

    }
  


  ngOnInit() {
    this.postRef=this.afs.doc('')

    this.dataState(); // Initialize checkin's list, when component is ready
    const s = this.crudApi.GetcheckinsList();
    this.LecturerCheckin = [];
    s.snapshotChanges().pipe(first())
    .subscribe((res: DocumentChangeAction<any>[]) => {
      res.forEach((result: DocumentChangeAction<any>) => {
        const data = result.payload.doc.data();
        data['$key'] = result.payload.doc.id;
        this.LecturerCheckin.push(data as LecturerCheckin);
        console.log('Data', data);
      });
    });
  }

  dataState() {
    this.crudApi.GetcheckinsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNocheckin = false;
        this.noData = true;
      } else {
        this.hideWhenNocheckin = true;
        this.noData = false;
      }
    });
  }

  // Method to delete checkin object
  deletecheckin(checkin) {
    if (window.confirm('Are sure you want to delete this checkin ?')) { // Asking from user before Deleting checkin data.
      this.crudApi.Deletecheckin(checkin.$key); // Using Delete checkin API to delete checkin.
      this.toastr.success(checkin.firstName + ' successfully deleted!'); // Alert message will show up when checkin successfully deleted.
    }
  }


}
