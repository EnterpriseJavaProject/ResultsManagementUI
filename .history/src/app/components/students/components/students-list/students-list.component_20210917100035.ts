import { Component, OnInit, ViewChild } from '@angular/core';
import { CardItem, Student } from "../../interfaces/models";
import { StudentsService } from '../../services/students.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentsFormComponent } from '../students-form/students-form.component';
import {  ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';
import { errorAlert, successAlert } from 'src/app/utils/constants';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {


  totalStudent:any;
  activeStudents:any;
  cardsData:CardItem[];
  id_number:any;

  data:any[]
  displayedColumns: string[] = ['student_id', 'name', 'email', 'course','actions'];
  dataSource: MatTableDataSource<Student>=new MatTableDataSource([]);

  constructor(private studentService:StudentsService, private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
    this.loadStats()


  }
 

    loadData = () => {
      this.studentService.getAllStudent().subscribe(stdudents => {
        this.data = stdudents;
        this.dataSource = new MatTableDataSource(this.data)
        this.activeStudents=this.data.filter(m=>m.status=="Active").length
        console.log(typeof(this.activeStudents))

      });

    }

    loadStats=()=>{
      this.studentService.getTotalStudents().subscribe(
        totstudents =>{
          this.totalStudent = totstudents;
          this.cardsData= [
            { messages:[{headerMessage:'Total Students',headerValue:this.totalStudent} ], headerIcon: 'fas fa-user-graduate', headerColor:'#ef5350'},
            { messages:[{headerMessage: 'Active Students',headerValue:'10'} ], headerIcon: 'fas fa-eye',headerColor:'#68EF50' },
            { messages:[{headerMessage: 'Inactive Students',headerValue:'10'} ], headerIcon: 'fas fa-eye-slash',headerColor:'#50C8EF' },
          ];
        })
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
    this.router.navigate(['/student-info'])  }




    openDialog(data:Student) {  
      // debugger;  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
          'top': '10vh',  
          'left': '30vw'  
      };  
      dialogConfig.width = '600px';  
      dialogConfig.height = '700px';
        
      dialogConfig.data = {  
          ...data,
          type:'update'
      };  
      this.dialog.open(StudentsFormComponent, dialogConfig);  
    }


    openAddDialog() {  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
          'top': '10vh',  
          'left': '30vw'  
      };  
      dialogConfig.width = '600px';  
      dialogConfig.height = '650px';
        
      dialogConfig.data = {
        type:'add',
        
      }  
      this.dialog.open(StudentsFormComponent, dialogConfig);  
    }

    openCourseDialog(data) {  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
          'top': '19vh',  
          'left': '35vw'  
      };  
      dialogConfig.width = '30vw';  
      dialogConfig.height = '350px';
        
      dialogConfig.data = {
        type:'course',
        rowData: data,
      }  
      this.dialog.open(StudentsFormComponent, dialogConfig);  
    }
  openConfirmDialog(data){
    const upp=(data.name).toUpperCase()
    localStorage.setItem('item_id',data.id)
    const  dialogConfig = new MatDialogConfig();
    const message = `Are you sure you want to delete : ` + upp;
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.data = {
      message:message,
      title:'Confirm Action',
     clickFunction:this.deleteStudent
       }
    this.dialog.open(ConfirmationComponentComponent, dialogConfig);  
    }
    

     deleteStudent=(data)=>{
     this.studentService.deleteResource(`delete/${data}`)
    .subscribe (
      success => {
        return(
          successAlert('Student Deleted Successfully') )
      },
      error => {
        return(
        errorAlert('Error Occured'))
      })      

  }

   
}
