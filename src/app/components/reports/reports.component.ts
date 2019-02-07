import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ReportsService } from 'src/app/shared/services/reports.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  constructor( private router: Router,
    public reportService:ReportsService) { }
   
   
    checkins=[];

    ngOnInit(){ 
      this.reportService.Getstudents().valueChanges().subscribe((data:any) => {

        this.checkins=data
    });
   }

    
  }
