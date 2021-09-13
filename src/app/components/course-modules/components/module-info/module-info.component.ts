import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections'; 
import { CourseModule } from '../../interfaces/models';
import { MatPaginator } from '@angular/material/paginator';
import { ModuleService } from '../../services/course-module.service';

@Component({
  selector: 'app-module-info',
  templateUrl: './module-info.component.html',
  styleUrls: ['./module-info.component.css']
})
export class ModuleInfoComponent implements OnInit {
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
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
