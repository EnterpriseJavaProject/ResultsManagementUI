import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationComponentComponent } from 'src/app/components/confirmation-component/confirmation-component.component';
import { errorAlert, successAlert } from 'src/app/utils/constants';
import { CardItem, User } from '../../interfaces/model';
import { UserService } from '../../services/users.service';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  totalUsers:any;
  activeUsers:number;
  inactiveUsers:number;
  cardsData:CardItem[];

  data:any[]
  displayedColumns: string[] = ['staff_id', 'email','usertype', 'status','actions'];
  dataSource: MatTableDataSource<User>=new MatTableDataSource([]);


  constructor(private userService:UserService, private router:Router,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.loadData();
    Promise.resolve().then(()=> 
    this.loadStats() );
  }
  loadData = () => {
    this.userService.getAllUsers().subscribe(users => {
      this.data = users;
      this.dataSource = new MatTableDataSource(this.data)
    });
    }
    loadStats=()=>{
      this.userService.getUsersStats().subscribe(
        totusers =>{
          this.totalUsers = totusers.total;
          this.activeUsers = totusers.active
          this.inactiveUsers = totusers.inactive
          this.cardsData= [
            { messages:[{headerMessage:'Total Users',headerValue:this.totalUsers} ], headerIcon: 'fas fa-th', headerColor:'#ef5350'},
            { messages:[{headerMessage: 'Active Users',headerValue:this.activeUsers} ], headerIcon: 'fas fa-eye',headerColor:'#68EF50' },
            { messages:[{headerMessage: 'Inactive Users',headerValue:this.inactiveUsers} ], headerIcon: 'fas fa-eye-slash',headerColor:'#50C8EF' },
                
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
    this.router.navigate(['/users-info']) 
    localStorage.setItem('users_id',data.id) }

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
    dialogConfig.height = '45vh';
        
      dialogConfig.data = {  
          ...data,
          type:'update'
      };  
      this.dialog.open(UsersFormComponent, dialogConfig);  
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
      this.dialog.open(UsersFormComponent, dialogConfig);  
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
        this.userService.deleteResource(`deleteModulesById/${data}`)
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
