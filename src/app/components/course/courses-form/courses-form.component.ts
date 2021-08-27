import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../interfaces/model';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CoursesListComponent } from '../courses-list/courses-list.component';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.css']
})
export class CoursesFormComponent implements OnInit {
  @Input()
  addOnlyForm: boolean = false;

  courseForm:FormGroup;
  course:Course;
  condata:[];
  tyye:any

  constructor(    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoursesListComponent>,
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
      

      this.courseForm.patchValue(this.condata)
  
    }
  }
}
