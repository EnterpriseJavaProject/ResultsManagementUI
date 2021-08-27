import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { Course } from '../../course/interfaces/model';
import { CoursesService } from '../../course/services/course.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.css']
})
export class StudentsInfoComponent implements OnInit {
  data:any[]
  tableData:any[]

  displayedColumns: string[] = ['course_name', 'course_code', 'start_date'];
dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);

  
  constructor(private courseService:CoursesService,) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
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
