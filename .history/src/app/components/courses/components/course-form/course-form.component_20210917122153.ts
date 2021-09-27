import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../interfaces/model';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseListComponent } from '../course-list/course-list.component';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from '../../../../services/custom-validation'; 
import { successAlert } from 'src/app/utils/constants';
import { CoursesService } from '../../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  @Input()
  addOnlyForm: boolean = false;

  courseForm:FormGroup;
  course:Course;
  condata:[];
  tyye:any

  minDate=new Date();

confirmValidParentMatcher = new ConfirmValidParentMatcher();

errors = errorMessages;
  constructor( 
    private courseService:CoursesService,   
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data.rowData,
    this.tyye=data.type }


 
 ngOnInit(): void {
 
    this.courseForm =  this.fb.group({
      course_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      code: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
      course_level:['', [Validators.pattern('[0-9]+'),Validators.required]],
      course_start_date:['', [Validators.required]],
      course_end_date:['', [Validators.required]],
      certificate_issuedate:['', [Validators.required]],


    });
    if(this.tyye === 'add'){
      this.addOnlyForm = true
    }
  }
  close() {  
    this.dialogRef.close();  
}  

ngAfterViewInit(){
  if(this.condata){
    Promise.resolve().then(()=>  this.courseForm.patchValue(this.condata))
  }
}


onAdd(){
  if(this.courseForm.valid){
    const formValues = this.courseForm.getRawValue();
    const courseData = {
      course_name: formValues.course_name,
      code: formValues.code,
      course_level: formValues.course_level,
      course_start_date: formValues. course_start_date,
      course_end_date: formValues.course_end_date,
      certificate_issuedate:formValues.certificate_issuedate,
      status:'Active'
     }
      this.courseService.storeResource(courseData,"courses/saveCourse").subscribe(
        (d: any) => {
          this.close()
          successAlert('Course Created Successfully')
        }
      )
    } }


}
