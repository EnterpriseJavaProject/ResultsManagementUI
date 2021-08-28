import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Course } from "../interfaces/model";
import { CoursesService } from '../services/course.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { Router } from '@angular/router';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CoursesFormComponent } from '../courses-form/courses-form.component';
import { ConfirmationComponentComponent, ConfirmDialogModel } from '../../confirmation-component/confirmation-component.component';
import { CourseModuleFormComponent } from '../../course-module/course-module-form/course-module-form.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  data:any[]
  displayedColumns: string[] = ['course_name', 'course_code', 'level', 'start_date','actions'];
  dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);

  constructor(private courseService:CoursesService, private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();

  }
  loadData = () => {
    this.data= this.courseService.getAllCourses();
     this.dataSource = new MatTableDataSource(this.data)
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
          'top': '5vh',  
          'left': '400px'  
      };  
      dialogConfig.width = '600px';  
      dialogConfig.height = '600px';
        
      dialogConfig.data = {  
          rowData: data,
          type:'edit'
      };  
      this.dialog.open(CoursesFormComponent, dialogConfig);  
    }

    openAddDialog() {  
      // debugger;  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
          'top': '5vh',  
          'left': '400px'  
      };  
      dialogConfig.width = '600px';  
      dialogConfig.height = '600px';
        
      dialogConfig.data = {
        type:'add'
      }  
      this.dialog.open(CoursesFormComponent, dialogConfig);  
    }

    openCourseDialog(data) {  
      // debugger;  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
        'top': '5vh',  
        'left': '400px'  
    };  
    dialogConfig.width = '50vw';  
    dialogConfig.height = '75vh';
        
      dialogConfig.data = {
        type:'add'
        // rowData: data,
      }  
      this.dialog.open(CourseModuleFormComponent, dialogConfig);  
    }
    openConfirmDialog(data){
      const upp=(data.course_name).toUpperCase()
    
  
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