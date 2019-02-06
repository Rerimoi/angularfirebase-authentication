import { Component, OnInit } from '@angular/core';

import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
imports: [TelerikReportingModule]


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  viewerContainerStyle = {
    position: 'relative',
    width: '1000px',
    height: '800px',
    ['font-family']: 'ms sans serif'
  };


  constructor( ) { }

  ngOnInit() {
  }

}
