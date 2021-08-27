import { Component, OnInit,ViewChild } from '@angular/core';
import { LEcturesService } from '../services/lectures.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { Course } from '../../course/interfaces/model';
import { CoursesService } from '../../course/services/course.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lectures-info',
  templateUrl: './lectures-info.component.html',
  styleUrls: ['./lectures-info.component.css']
})
export class LecturesInfoComponent implements OnInit {
data:any[]
tableData:any[]

displayedColumns: string[] = ['course_name', 'course_code', 'start_date'];
dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);

  constructor(private service:LEcturesService,private courseService:CoursesService,) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
    this.data=  this.service.getAllLecturers();
   const user = this.data.find(a=> a.id == JSON.parse(localStorage.staff_id)) ;
    console.log(user)
  }
  loadData = () => {
    this.tableData= this.courseService.getAllCourses();
     this.dataSource = new MatTableDataSource(this.tableData)
    }

    ngAfterViewInit() {
      if(this.dataSource){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      setTimeout(() => this.dataSource.paginator = this.paginator);
  
    }
}
