import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModuleService} from '../services/course-module.service';
import { CourseModuleFormComponent } from '../course-module-form/course-module-form.component';
import { CourseModule } from '../interfaces/models';

@Component({
  selector: 'app-course-module-list',
  templateUrl: './course-module-list.component.html',
  styleUrls: ['./course-module-list.component.css']
})
export class CourseModuleListComponent implements OnInit {
  data:any[]
  displayedColumns: string[] = ['module_name', 'module_code', 'course_name','actions'];
  dataSource: MatTableDataSource<CourseModule>=new MatTableDataSource([]);


  constructor(private courseService:ModuleService, private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();

  }
  loadData = () => {
    this.data= this.courseService.getAllModuless();
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
      this.dialog.open(CourseModuleFormComponent, dialogConfig);  
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
      this.dialog.open(CourseModuleFormComponent, dialogConfig);  
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