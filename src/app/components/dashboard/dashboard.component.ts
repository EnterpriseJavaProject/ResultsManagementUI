import { Component, OnInit,Input } from '@angular/core';

export interface CardItem {
  messages: [{
    headerMessage:string,
    headerValue:string
  }];
  headerIcon: string;
  headerColor:string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cardsData: CardItem[] = [
    { messages:[{headerMessage:'New Categories',headerValue:'14'} ], headerIcon: 'fas fa-clock', headerColor:'#ef5350'},
    { messages:[{headerMessage: 'Total Categories',headerValue:'10'} ], headerIcon: 'fas fa-clipboard-list',headerColor:'#e81e62' },
  ];
  

 


  constructor() {

  }

 
  

  ngOnInit() {
  

  }

}