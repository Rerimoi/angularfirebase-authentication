import { Component, OnInit } from '@angular/core';
import { LecturerCheckinService } from '../../shared/services/lecturer-checkin.service';
import { ActivatedRoute } from '@angular/router';
import { LecturerCheckin } from 'src/app/shared/services/lecturer-checkin';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StudentCheckinService } from '../../shared/services/student-checkin.service';
import { debounce } from './debounce';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-lecturer-checkin-view',
  templateUrl: './lecturer-checkin-view.component.html',
  styleUrls: ['./lecturer-checkin-view.component.css']
})
export class LecturerCheckinViewComponent implements OnInit {
  lecturerCheckin: LecturerCheckin;
  _timeoutIds = {};
  public watchid;
  public checkinForm: FormGroup;
  public studentCheckins;
  checkedIn = false;
  constructor(public crudApi: LecturerCheckinService,
    public studentCheckinService: StudentCheckinService,
    private actRoute: ActivatedRoute, public fb: FormBuilder, private firestore: AngularFirestore ) { }

  ngOnInit() {
    this.checkinForm = this.fb.group({
      admissionNumber: ['', [Validators.required, Validators.minLength(2)]],
    });
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.Getcheckin(id).subscribe(data => {
      this.lecturerCheckin = data.data() as LecturerCheckin;
      this.getStudents();
    });


  }


  get admissionNumber() {
    return this.checkinForm.get('admissionNumber');
  }

getStudents() {
  const id = this.actRoute.snapshot.paramMap.get('id');
  this.crudApi.GetcheckinsStudentList(this.lecturerCheckin, id ).subscribe((values) => {
    console.log('Values', values);
    this.studentCheckins = values;
  });
}
  toggleCheckin() {
    this.checkedIn = !this.checkedIn;
    if (this.checkedIn) {
      const studentCheckin = this.checkinForm.value;
      const id = this.actRoute.snapshot.paramMap.get('id');
      studentCheckin.lecturerCheckin = id;
      this.getUserLocation(studentCheckin);
    } else {
      this.checkinForm.setValue({ admissionNumber: '' });
      this.clearWatch(this.watchid);
    }
  }
  private getUserLocation(studentCheckin) {
    /// locate the user
    const options = { enableHighAccuracy: false, timeout: 60000, maximumAge: 60000 , throttleTime: 10000};

    if (navigator.geolocation) {
      this.watchid = this.watchPosition((position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        studentCheckin.location = coords;
        this.logCheckin(studentCheckin);
      }, (error) => {
        console.log('Error Getting location', error);
      }, options);
    }
  }

  watchPosition(callback, errorCallback, options) {
    const throttleTime = (!options ? 0 : options.throttleTime || 20);
    const that2 = this;
    let bufferedArguments = null;
    let lastCall = null;
    let timeoutId = null;
    let watchId = null;

    watchId = navigator.geolocation.watchPosition(function () {
      // update bufferedArguments
      bufferedArguments = arguments;

      if (!lastCall) {
        // console.log("calling immediately initially");
        lastCall = new Date();
        callback.apply(this, arguments);
      } else if (!timeoutId) {
        // check if we've already passed the buffer time, in which case
        // we'll call the callback immediately
        if (+new Date() - lastCall > throttleTime) {
          // console.log("calling immediately since time has already passed");
          lastCall = new Date();
          callback.apply(this, arguments);
        } else {
          // if not enough time has passed since the last callback, we'll schedule
          // a callback in the future
          const that = this;
          // console.log("call scheduled");
          timeoutId = setTimeout(function () {
            // console.log("Call");
            lastCall = new Date();
            callback.apply(that, bufferedArguments);

            timeoutId = null;
            that2._timeoutIds[watchId] = null;
          }, throttleTime - (+new Date() - lastCall));

          // we store the timeout id so that we can clear the timeout if clearWatch
          // is called before the setTimeout fires
          that2._timeoutIds[watchId] = timeoutId;
        }
      } else {
        // we already have a scheduled call
        // console.log("skipping call");
      }
    }, errorCallback, options);
    return watchId;
  }

  clearWatch(watchId) {
    navigator.geolocation.clearWatch(watchId);
    // if there's a scheduled watch position callback we'll clear it
    const timeoutId = this._timeoutIds[watchId];
    if (timeoutId) {
      clearTimeout(timeoutId);
      this._timeoutIds[watchId] = null;
    }
  }


  logCheckin(studentCheckin) {
    console.log('Log', studentCheckin);
    this.studentCheckinService.Addcheckin(studentCheckin).then((result) => {
      // Show success message when data is successfully submited
    }).catch((error) => {
      console.log('Error', error);
    }); // Submit checkin data using CRUD API
  }

 
}

