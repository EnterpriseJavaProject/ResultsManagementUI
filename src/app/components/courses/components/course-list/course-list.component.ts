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
import { ModuleFormComponent } from 'src/app/components/course-modules/components/module-form/module-form.component';
import { ConfirmDialogModel, ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  data:any[]
  displayedColumns: string[] = ['course_name', 'course_code', 'level', 'start_date','actions'];
  dataSource: MatTableDataSource<Course>=new MatTableDataSource([]);

  cardsData: CardItem[] = [
    { messages:[{headerMessage:'Total Courses',headerValue:'14'} ], headerIcon: 'fas fa-scroll', headerColor:'#ef5350'},
    { messages:[{headerMessage: 'Active Courses',headerValue:'10'} ], headerIcon: 'fas fa-eye',headerColor:'#68EF50' },
    { messages:[{headerMessage: 'Inactive Courses',headerValue:'10'} ], headerIcon: 'fas fa-eye-slash',headerColor:'#50C8EF' },

  ];
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
          'top': '5vh',  
          'left': '400px'  
      };  
      dialogConfig.width = '600px';  
      dialogConfig.height = '600px';
        
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
        'top': '5vh',  
        'left': '400px'  
    };  
    dialogConfig.width = '50vw';  
    dialogConfig.height = '75vh';
        
      dialogConfig.data = {
        type:'add'
        // rowData: data,
      }  
      this.dialog.open(ModuleFormComponent, dialogConfig);  
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