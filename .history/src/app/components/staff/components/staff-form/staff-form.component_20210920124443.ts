import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Staff } from '../../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StaffListComponent } from '../staff-list/staff-list.component';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from '../../../../services/custom-validation'; 
import { CoursesService } from '../../../courses/services/course.service';
import { Course } from '../../../courses/interfaces/model';


@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {
  courses = [
    { id: 1, name: "WEB TECH" },
    { id: 2, name: "CSD" },
    { id: 3, name: "DBC" },
  ];
  course_modules = [
    { id: 1, name: "HTML" },
    { id: 2, name: "JAVASCRIPT" },
    { id: 3, name: "ANGULAR" },
  ];
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

errors = errorMessages;
  usertypes = [
    { id: 1, name: "Instructor" },
    { id: 2, name: "Course Cordinator" },
    { id: 3, name: "Director of Studies" },
    {id:4, name:"Academic Secretary"}
  
  ];
  @Input()
  addOnlyForm: boolean = false;
  addCourseForm: boolean = false;
  updateOnlyForm:boolean = false;

  lecturerForm:FormGroup;
  courseForm:FormGroup;
courseList:any[]
  lecturer:Staff;
condata:[];
tyye:any
  constructor(
    private fb: FormBuilder,
  private courseService:CoursesService,
    private dialogRef: MatDialogRef<StaffListComponent>,
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
      usertype:['', [Validators.required]],
      course_name:[''],


    });
    this.courseForm = this.fb.group({
      course_name:['', [Validators.required]],
      module_name:['', [Validators.required]]
    })
    this.loadCourses()
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

loadCourses = () => {
  this.courseService.getAllCourse().subscribe(courses=>{
    this.courseList = courses.map(({id, course_name}) => ({id, course_name}))
   } )
  }

 
  ngAfterViewInit(){
    if(this.condata){
      Promise.resolve().then(()=>  this.lecturerForm.patchValue(this.condata))
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
