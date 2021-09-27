import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseModule } from '../../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModuleListComponent } from '../module-list/module-list.component';
import { StaffService } from '../../../staff/services/staff.service';
import { CoursesService } from '../../../courses/services/course.service';

@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.css']
})
export class ModuleFormComponent implements OnInit {
  @Input()
  addOnlyForm: boolean = false;

  moduleForm:FormGroup;
  course_module:CourseModule;
  condata:[];
  tyye:any;
  courseInstructors:any[]
  courseList:any[]

  constructor(    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModuleListComponent>,
    private staffService:StaffService,
    private courseService:CoursesService,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data.rowData,
    this.tyye=data.type }

  
    ngOnInit(): void {
 this.loadInstructors()
 this.loadCourses()
      this.moduleForm =  this.fb.group({
        module_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        course_name: ['', [Validators.required]],
        module_code: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
        lecturer:['', [Validators.required]],
     
  
  
      });

      if(this.tyye === 'add'){
        this.addOnlyForm = true
      }
    }
    close() {  
      this.dialogRef.close();  
  }  
  loadInstructors(){
    this.staffService.getInstructors().subscribe(instructors=>{
      this.courseInstructors = instructors.map(({id, name}) => ({id, name}))
    } )
    }

loadCourses = () => {
  this.courseService.getAllCourse().subscribe(courses=>{
    this.courseList = courses.map(({id, course_name}) => ({id, course_name}))
   } )
  }

    
  
    ngAfterViewInit(){
      if(this.condata){
        
  
        this.moduleForm.patchValue(this.condata)
    
      }
    }
  }
  