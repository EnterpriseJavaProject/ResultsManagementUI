import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { MatPaginator } from '@angular/material/paginator';
import { StaffService } from '../../services/staff.service';
import { CoursesService } from 'src/app/components/courses/services/course.service';
import { Course } from 'src/app/components/courses/interfaces/model';
import { Staff } from '../../interfaces/models';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.scss']
})
export class StaffInfoComponent implements OnInit {
  data:any[]
  tableData:any[]
  staffInfo:Staff | undefined
  displayedColumns: string[] = ['course_name', 'course_code', 'start_date'];
  dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);
  
    constructor(private service:StaffService,private courseService:CoursesService,) { }
  
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    ngOnInit(): void {
      this.loadData();
      this.loadInfo()
      this.data=  this.service.getAllStaff();
     const user = this.data.find(a=> a.id == JSON.parse(localStorage.staff_id)) ;
      console.log(user)
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
        this.service.getAllStaffs().subscribe(result => {  
          this.staffInfo =  result.find(a => a.id == localStorage.staff_id); 
          console.log(this.staffInfo)} )
      
      
      
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
  }
  