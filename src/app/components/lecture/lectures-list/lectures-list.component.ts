import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Staff } from "../interfaces/models";
import { LEcturesService } from '../services/lectures.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { LecturesFormComponent } from '../lectures-form/lectures-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponentComponent, ConfirmDialogModel } from '../../confirmation-component/confirmation-component.component';



@Component({
  selector: 'app-lectures-list',
  templateUrl: './lectures-list.component.html',
  styleUrls: ['./lectures-list.component.css']
})
export class LecturesListComponent implements OnInit, AfterViewInit  {
  data:any[]
  isLecturer:boolean=false

  
  
  displayedColumns: string[] = ['staff_id', 'full_name', 'email', 'course','actions'];
  dataSource: MatTableDataSource<Staff>=new MatTableDataSource([]);
  selection = new SelectionModel<Staff> (true, []);  
  
  
  
  constructor(private lecturerService:LEcturesService,private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
    // console.log(this.data.map(({id, usertype}) => ({id, usertype})))

  }
  loadData = () => {
  this.data= this.lecturerService.getAllLecturers();
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
        type:'edit'
    };  
    this.dialog.open(LecturesFormComponent, dialogConfig);  
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
    this.dialog.open(LecturesFormComponent, dialogConfig);  
  }
  openCourseDialog(data) {  
    // debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.position = {  
        'top': '18vh',  
        'left': '500px'  
    };  
    dialogConfig.width = '22vw';  
    dialogConfig.height = '50vh';
    dialogConfig.data = {
      type:'course',
      rowData: data,
    }  
    this.dialog.open(LecturesFormComponent, dialogConfig);  
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
