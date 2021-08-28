import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StudentsListComponent } from '../students-list/students-list.component';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {
  @Input()
  addOnlyForm: boolean = false;
  addCourseForm: boolean = false;
  updateOnlyForm:boolean = false;

  endtoday = new Date();
  selectedGender: string;
  genders: string[] = ['Male', 'Female'];

 studentForm:FormGroup;
 courseForm:FormGroup;
 student:Student;
 condata:[];
 tyye:any

  constructor(    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentsListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data.rowData,
  this.tyye=data.type }

  
  ngOnInit(): void {
    this.studentForm =  this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      contact: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
      email:['', [Validators.email,Validators.required]],
      student_id:['', [Validators.required]],
      date_of_birth:['', [Validators.required]],
      gender:['', [Validators.required]],
      usertype:['Student', [Validators.required]],
      password:['', [Validators.required]],
      course_id:['', [Validators.required]],
    });
    this.courseForm = this.fb.group({
      course_name:['', [Validators.required]],
      module_name:['', [Validators.required]]
    })
   if(this.tyye === 'add'){
      this.addOnlyForm = true
    }else if(this.tyye === 'course'){
      this.addCourseForm = true
    }else if(this.tyye === 'update'){
      this.updateOnlyForm = true
    }   
  }
  close() {  
    this.dialogRef.close();  
}  

  ngAfterViewInit(){
    if(this.condata){
      this.studentForm.patchValue(this.condata)
    }
  }

  
  onAdd(){
    const data = this.studentForm.value;
    const newAdd=[];
    newAdd.push(data)
    console.log(newAdd)

  }
}
