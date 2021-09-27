import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../interfaces/model';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseListComponent } from '../course-list/course-list.component';

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

  constructor(    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data.rowData,
    this.tyye=data.type }


 
 ngOnInit(): void {
 
    this.courseForm =  this.fb.group({
      course_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      course_code: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
      level:['', [Validators.required]],
      start_date:['', [Validators.required]],
      end_date:['', [Validators.required]],
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

}
