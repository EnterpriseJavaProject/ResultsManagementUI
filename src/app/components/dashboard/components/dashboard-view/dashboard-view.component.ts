import { Component, OnInit } from '@angular/core';
import { CardItem } from '../../interfaces/models';
import { saleData } from '../../utils/constants';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  saleData;
  cardsData: CardItem[] = [
    { messages:[{headerMessage:'Total Students',headerValue:'14'} ], headerIcon: 'fas fa-user-graduate', headerColor:'#ef5350'},
    { messages:[{headerMessage: 'Total Courses',headerValue:'10'} ], headerIcon: 'fas fa-scroll',headerColor:'#68EF50' },
    // { messages:[{headerMessage: 'Total Modules',headerValue:'10'} ], headerIcon: 'fas fa-th',headerColor:'#50C8EF' },
    { messages:[{headerMessage: 'Total Instructors',headerValue:'10'} ], headerIcon: 'fas fa-chalkboard-teacher',headerColor:'#EBB6FB' },

  ];
  constructor() { }

  ngOnInit(): void {
    this.saleData=saleData
  }

}
