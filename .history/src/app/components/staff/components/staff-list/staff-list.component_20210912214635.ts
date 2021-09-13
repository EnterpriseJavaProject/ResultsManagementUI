import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CardItem, Staff } from "../../interfaces/models";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { StaffFormComponent } from '../staff-form/staff-form.component';
import { ConfirmDialogModel, ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  data:any[]
  isLecturer:boolean=false
  displayedColumns: string[] = ['staff_id', 'full_name', 'email', 'course','actions'];
  dataSource: MatTableDataSource<Staff>=new MatTableDataSource([]);
  selection = new SelectionModel<Staff> (true, []);  
  
  cardsData: CardItem[] = [
    { messages:[{headerMessage:'Total Staff',headerValue:'14'} ], headerIcon: 'fas fa-chalkboard-teacher', headerColor:'#ef5350'},
    { messages:[{headerMessage: 'Active Staff',headerValue:'10'} ], headerIcon: 'fas fa-eye',headerColor:'#68EF50' },
    { messages:[{headerMessage: 'Inactive Staff',headerValue:'10'} ], headerIcon: 'fas fa-eye-slash',headerColor:'#50C8EF' },

  ];
  
  constructor(private staffService:StaffService,private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
    // console.log(this.data.map(({id, usertype}) => ({id, usertype})))

  }
  loadData = () => {
  this.data= this.staffService.getAllStaff();
   this.dataSource = new MatTableDataSource(this.data);
  }

  getElement(){
    var obj = this.data;

    Object.entries(obj).forEach(
      ([key, value]) => 
   
      console.log(key, value.usertype)
  );
  }

  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    setTimeout(() => this.dataSource.paginator = this.paginator);

  }
  
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

openInfoDialog(data) {  
  this.router.navigate(['/staff-info']);
  localStorage.setItem('staff_id',data.id)
  }



  openDialog(data) {  
    // debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.position = {  
        'top': '5vh',  
        'left': '30vw'  
    };  
    dialogConfig.width = '600px';  
    dialogConfig.height = '600px';
      
    dialogConfig.data = {  
        rowData: data,
        type:'update'
    };  
    this.dialog.open(StaffFormComponent, dialogConfig);  
  }


  openAddDialog() {  
    // debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.position = {  
        'top': '5vh',  
        'left': '30vw'  
    };  
    dialogConfig.width = '600px';  
    dialogConfig.height = '600px';
      
    dialogConfig.data = {
      type:'add'
    }  
    this.dialog.open(StaffFormComponent, dialogConfig);  
  }
  openCourseDialog(data) {  
    // debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.position = {  
      'top': '19vh',  
      'left': '40vw'
    };  
    dialogConfig.width = '30vw';  
    dialogConfig.height = '55vh';
    dialogConfig.data = {
      type:'course',
      rowData: data,
    }  
    this.dialog.open(StaffFormComponent, dialogConfig);  
  }
  openConfirmDialog(data){
    const upp=(data.full_name).toUpperCase()
    const message = `Are you sure you want to delete : ` + upp;
  
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmationComponentComponent, {
      // maxWidth: "400px",
      data: dialogData
    });

    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   this.result = dialogResult;
    // }); 
    }


}
