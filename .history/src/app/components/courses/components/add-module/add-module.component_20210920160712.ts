import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseModule } from 'src/app/components/course-modules/interfaces/models';
import { CoursesService } from '../../services/course.service';
import { CourseListComponent } from '../course-list/course-list.component';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from '../../../../services/custom-validation'; 

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
  tyye:any
  courseList:any[]
  constructor(    
    private fb: FormBuilder,
    private courseService:CoursesService,
    private dialogRef: MatDialogRef<CourseListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data
    }

  
    ngOnInit(): void {
 
      this.moduleForm =  this.fb.group({
        module_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        course_name: [''],
        module_code: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
        lecturer:[''],
      });
  
    }

 
    close() {  
      this.dialogRef.close();  
  }  
  
    ngAfterViewInit(){
      if(this.condata){
        this.moduleForm.patchValue({course_name:this.condata['course_name']})
    
      }
    }
  }
  