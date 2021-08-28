import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { CourseModule } from '../interfaces/models';
import { ModuleService } from '../services/course-module.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-course-module-info',
  templateUrl: './course-module-info.component.html',
  styleUrls: ['./course-module-info.component.css']
})
export class CourseModuleInfoComponent implements OnInit {
  data:any[]
  tableData:any[]

  displayedColumns: string[] = ['module_name', 'module_code', 'course_name'];
dataSource: MatTableDataSource<CourseModule>=new MatTableDataSource([]);

  
  constructor(private moduleService:ModuleService,) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
  }
  loadData = () => {
    this.tableData= this.moduleService.getAllModuless();
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
