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

    openConfirmDialog(){
        // const dialogInterface: DialogInterface = {
        //   dialogHeader: 'Confirm Action',
        //   dialogContent: ConfirmationComponentComponent,
        //   cancelButtonLabel: 'No',
        //   confirmButtonLabel: 'Yes',
        //   callbackMethod: () => {
        //     // this.performDialogSubmitMethodOne();
        //   },
        // };
        // this.dialog.open(AppDialogComponent, {
        //   width: '30vw',
        //   disableClose:true,
        //   data: dialogInterface,
        // }); 
      }
      

}