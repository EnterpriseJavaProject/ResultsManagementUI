import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseModule } from 'src/app/components/course-modules/interfaces/models';
import { CoursesService } from '../../services/course.service';
import { CourseListComponent } from '../course-list/course-list.component';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from '../../../../services/custom-validation'; 
import { StaffService } from '../../../staff/services/staff.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  @Input()
  addOnlyForm: boolean = false;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

errors = errorMessages;
  moduleForm:FormGroup;
  course_module:CourseModule;
  condata:[];
  tyye:any;
  courseInstructors:any[]
  courseList:any[]
  constructor(    
    private fb: FormBuilder,
    private courseService:CoursesService,
    private staffService:StaffService,
    private dialogRef: MatDialogRef<CourseListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data
    }

  
    ngOnInit(): void {
      this.loadInstructors()
 
      this.moduleForm =  this.fb.group({
        module_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        course_name: [{value: '', disabled:true}],
        module_code: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
        lecturer:[''],
      });
  
    }

 
    close() {  
      this.dialogRef.close();  
  } 
  
  loadInstructors(){
  this.staffService.getInstructors().subscribe(instructors=>{
    this.courseInstructors = instructors.map(({id, name}) => ({id, name}))
  } )

  }
  
  ngAfterViewInit(){
    if(this.condata){
      Promise.resolve().then(()=>
      this.moduleForm.patchValue({course_name:this.condata['course_name']}))
    }
  }

  
  

  }
  