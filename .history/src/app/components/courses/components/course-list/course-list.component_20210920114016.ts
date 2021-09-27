import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CardItem, Course } from "../../interfaces/model";
import { CoursesService } from '../../services/course.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { Router } from '@angular/router';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CourseFormComponent } from '../course-form/course-form.component';
// import { ConfirmDialogModel, ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';
import { AddModuleComponent } from '../add-module/add-module.component';
import { errorAlert, successAlert } from 'src/app/utils/constants';
import { ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  totalCourses:any;
  activeCourses:number;
  inactiveCourses:number;
  cardsData:CardItem[];

  id_number:any;
  data:any[]
  displayedColumns: string[] = ['course_name', 'code', 'course_level', 'course_start_date','actions'];
  dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);

  constructor(private courseService:CoursesService, private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
    this.loadStats()
  }
  loadData = () => {
    this.courseService.getAllCourse().subscribe(courses=>{
      this.data = courses;
      this.dataSource = new MatTableDataSource(this.data)
      this.activeCourses=this.data.filter(m=>m.status=="Active").length
      this.inactiveCourses = this.data.length - this.activeCourses

    }    )
    }



    loadStats=()=>{
      this.courseService.getTotalCourses().subscribe(
        totcourses =>{
          this.totalCourses = totcourses;
          this.cardsData= [
            { messages:[{headerMessage:'Total Courses',headerValue:this.totalCourses} ], headerIcon: 'fas fa-scroll', headerColor:'#ef5350'},
            { messages:[{headerMessage: 'Active Courses',headerValue:this.activeCourses} ], headerIcon: 'fas fa-eye',headerColor:'#68EF50' },
            { messages:[{headerMessage: 'Inactive Courses',headerValue:this.inactiveCourses} ], headerIcon: 'fas fa-eye-slash',headerColor:'#50C8EF' },
        
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
    this.router.navigate(['/course-info'])  }

    openDialog(data) {  
      // debugger;  
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
          ...data,
          type:'update'
      };  
      this.dialog.open(CourseFormComponent, dialogConfig);  
    }

    openAddDialog() {  
      // debugger;  
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
        type:'add'
      }  
      this.dialog.open(CourseFormComponent, dialogConfig);  
    }

    openCourseDialog() {  
      // debugger;  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
        'top': '10vh',  
        'left': '30vw'  
    };  
    dialogConfig.width = '600px';  
    dialogConfig.height = '500px';
        
      dialogConfig.data = {
        type:'add'
        // rowData: data,
      }  
      this.dialog.open(AddModuleComponent, dialogConfig);  
    }
    openConfirmDialog(data){
      const upp=(data.course_name).toUpperCase()
    localStorage.setItem('item_id',data.id)
    const  dialogConfig = new MatDialogConfig();
    const message = `Are you sure you want to delete : ` + upp;
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.data = {
      message:message,
      title:'Confirm Action',
     clickFunction:this.deleteCourse
       }
    this.dialog.open(ConfirmationComponentComponent, dialogConfig);  
    }


    deleteCourse=(data)=>{
      this.courseService.deleteResource(`delete/${data}`)
     .subscribe (
       success => {
         return(
           successAlert('Course Deleted Successfully') )
       },
       error => {
         return(
         errorAlert('Error Occured'))
       })      
 
   }
}