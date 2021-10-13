import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';
import { errorAlert, successAlert } from 'src/app/utils/constants';
// import { ConfirmDialogModel, ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';
import { CardItem, CourseModule } from '../../interfaces/models';
import { ModuleService } from '../../services/course-module.service';
import { ModuleFormComponent } from '../module-form/module-form.component';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  totalModules:any;
  activeModules:number;
  inactiveModules:number;
  cardsData:CardItem[];

  data:any[]
  displayedColumns: string[] = ['module_name', 'course_name','staff_name', 'status','actions'];
  dataSource: MatTableDataSource<CourseModule>=new MatTableDataSource([]);



  constructor(private moduleService:ModuleService, private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
    Promise.resolve().then(()=> 
    this.loadStats() );
  }
  loadData = () => {
    this.moduleService.getAllModules().subscribe(modules => {
      this.data = modules;
      this.dataSource = new MatTableDataSource(this.data)
      this.activeModules=this.data.filter(m=>m.status=="Active").length
      this.inactiveModules = this.data.length - this.activeModules

    });
    }
    loadStats=()=>{
      this.moduleService.getTotalModules().subscribe(
        totmoduless =>{
          this.totalModules = totmoduless;
          this.cardsData= [
            { messages:[{headerMessage:'Total Modules',headerValue:this.totalModules} ], headerIcon: 'fas fa-th', headerColor:'#ef5350'},
            { messages:[{headerMessage: 'Active Modules',headerValue:this.activeModules} ], headerIcon: 'fas fa-eye',headerColor:'#68EF50' },
            { messages:[{headerMessage: 'Inactive Modules',headerValue:this.inactiveModules} ], headerIcon: 'fas fa-eye-slash',headerColor:'#50C8EF' },
                
          ];
        })
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
    this.router.navigate(['/module-info']) 
    localStorage.setItem('module_id',data.id) }

    openDialog(data) {  
      // debugger;  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
        'top': '10vh',  
        'left': '30vw'  
    };  
    dialogConfig.width = '600px';  
    dialogConfig.height = '49vh';
        
      dialogConfig.data = {  
          ...data,
          type:'update'
      };  
      this.dialog.open(ModuleFormComponent, dialogConfig);  
    }

    openAddDialog() {  
      // debugger;  
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.position = {  
        'top': '10vh',  
        'left': '30vw'  
    };  
    dialogConfig.width = '600px';  
    dialogConfig.height = '45vh';
        
      dialogConfig.data = {
        type:'add'
      }  
      this.dialog.open(ModuleFormComponent, dialogConfig);  
    }

    openConfirmDialog(data){
      const upp=(data.module_name).toUpperCase()
      localStorage.setItem('item_id',data.id)
      const  dialogConfig = new MatDialogConfig();
      const message = `Are you sure you want to delete : ` + upp;
      dialogConfig.disableClose = true;  
      dialogConfig.autoFocus = true;  
      dialogConfig.data = {
        message:message,
        title:'Confirm Action',
       clickFunction:this.deleteModule
         }
      this.dialog.open(ConfirmationComponentComponent, dialogConfig);  
      }
      
      openUpload(data){
        this.router.navigate(['/upload-grade']) 
      }


      deleteModule=(data)=>{
        this.moduleService.deleteResource(`deleteModulesById/${data}`)
       .subscribe (
         success => {
           return(
             successAlert('Module Deleted Successfully') )
         },
         error => {
           return(
           errorAlert('Error Occured'))
         })      
   
     }
}