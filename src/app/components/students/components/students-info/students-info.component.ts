import { AfterViewInit, Component, Input, OnInit,Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Course } from 'src/app/components/courses/interfaces/model';
import { CoursesService } from 'src/app/components/courses/services/course.service';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StudentsListComponent } from '../students-list/students-list.component';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.css']
})
export class StudentsInfoComponent implements OnInit {
  data:any[]
  tableData:any[]
  studentInfo:Student;
  condata:any;

  displayedColumns: string[] = ['course_name', 'course_code', 'start_date','action'];
dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);

  
  constructor(private courseService:CoursesService,
    private studentService:StudentsService,

    private router:Router) {
    
     }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  

  

  ngOnInit(){
    // return Promise.resolve().then(()=> 
    //   this.loadInfo()),
      this.loadData()
this.loadInfo()
 

  }
  loadData = () => {
    this.tableData= this.courseService.getAllCourses();
     this.dataSource = new MatTableDataSource(this.tableData)
    }

 async loadInfo(){
  // this.studentService.getById().subscribe(studentInfo => {
  //   this.studentInfo = studentInfo;
  //   console.log(this.studentInfo)
    

  // });
  this.studentService.getAllStudent().subscribe(result => {  
    this.studentInfo =  result.find(a => a.id == localStorage.student_id); 
    console.log(this.studentInfo)} )



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
    }
    viewGrade(){
      this.router.navigate(['/student-result']) 
    }
}
