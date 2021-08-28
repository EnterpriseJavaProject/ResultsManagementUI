import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Staff } from '../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LecturesListComponent } from '../lectures-list/lectures-list.component';
@Component({
  selector: 'app-lectures-form',
  templateUrl: './lectures-form.component.html',
  styleUrls: ['./lectures-form.component.css']
})
export class LecturesFormComponent implements OnInit {
  @Input()
  addOnlyForm: boolean = false;
  addCourseForm: boolean = false;
  updateOnlyForm:boolean = false;

  lecturerForm:FormGroup;
  courseForm:FormGroup;

  lecturer:Staff;
condata:[];
tyye:any
  constructor(
    private fb: FormBuilder,
  
    private dialogRef: MatDialogRef<LecturesListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {this.condata = data.rowData,
  this.tyye=data.type }

  ngOnInit(): void {
    this.lecturerForm =  this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      contact: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
      email:['', [Validators.email,Validators.required]],
      staff_id:['', [Validators.required]],
      password:['', [Validators.required]],
      course_id:['', [Validators.required]],
      usertype:['', [Validators.required]],

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
      this.lecturerForm.patchValue(this.condata)
    }
  }

  onAdd(){
    const data = this.lecturerForm.value;
    const newAdd=[];
    newAdd.push(data)
    console.log(newAdd)

  }
  onUpdate(){

  }
}
