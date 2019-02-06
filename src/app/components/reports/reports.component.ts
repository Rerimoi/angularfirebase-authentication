import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ReportsService } from 'src/app/shared/services/reports.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  // viewerContainerStyle = {
  //   position: 'relative',
  //   width: '1000px',
  //   height: '800px',
  //   ['font-family']: 'ms sans serif'
  // };



  constructor( private router: Router,
    public StudentCheckin,
    public ReportsService) { }

getAttendance(){
   this.ReportsService.GetStudents();
}
    ngOnInit(){ 
      this.getAttendance();  
    }
    }

    

    

