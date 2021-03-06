import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Student } from "../interfaces/models";
import { StudentsService } from '../services/students.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentsFormComponent } from '../students-form/students-form.component';
import { ConfirmationComponentComponent, ConfirmDialogModel } from '../../confirmation-component/confirmation-component.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  data:any[]
  displayedColumns: string[] = ['student_id', 'full_name', 'email', 'course','actions'];
  dataSource: MatTableDataSource<Student>=new MatTableDataSource([]);

  constructor(private studentService:StudentsService, private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();

  }
  loadData = () => {
    this.data= this.studentService.getAllStudents();
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
    this.router.navigate(['/student-info'])  }



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
      this.dialog.open(StudentsFormComponent, dialogConfig);  
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
        type:'add',
        
      }  
      this.dialog.open(StudentsFormComponent, dialogConfig);  
    }

    openCourseDialog(data) {  
      // debugger;  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
          'top': '18vh',  
          'left': '500px'  
      };  
      dialogConfig.width = '22vw';  
      dialogConfig.height = '50vh';
        
      dialogConfig.data = {
        type:'course',
        rowData: data,
      }  
      this.dialog.open(StudentsFormComponent, dialogConfig);  
    }
  openConfirmDialog(data){
    const upp=(data.full_name).toUpperCase()
  

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
