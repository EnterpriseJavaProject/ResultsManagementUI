import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { Course } from '../../interfaces/model';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  data:any[]
  tableData:any[]
courseInfo:Course | undefined
  displayedColumns: string[] = ['course_name', 'course_code', 'start_date'];
dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);

constructor(private courseService:CoursesService,) { }

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

ngOnInit(): void {
  this.loadData();
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
    this.courseService.getAllCourse().subscribe(result => {  
      this.courseInfo =  result.find(a => a.id == localStorage.course_id); 
      console.log(this.courseInfo)} )
  
  
  
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

}
