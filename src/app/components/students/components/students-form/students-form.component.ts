import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StudentsListComponent } from '../students-list/students-list.component';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from '../../../../services/custom-validation'; 
import { StudentsService } from '../../services/students.service';
import { successAlert } from 'src/app/utils/constants';
import { CoursesService } from '../../../courses/services/course.service';

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
  genders=[
  {"name": "Male",  "checked": true},
  {"name": "Female",  "checked": false}
]
statusList=[
  {"name": "Active", "value":"Active"},
  {"name": "InActive",  "value": "InActive"}
]
  

maxDate=new Date();

confirmValidParentMatcher = new ConfirmValidParentMatcher();

errors = errorMessages;

 studentForm:FormGroup;
 courseForm:FormGroup;
 student:Student;
 condata:any;
 tyye:any
courseList:any[]


  constructor(    
    private fb: FormBuilder,
    private studentService:StudentsService,
    private courseService:CoursesService,
    private config : MatDialogConfig,
    private dialogRef: MatDialogRef<StudentsListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data,
  this.tyye=data.type }

  
  ngOnInit(): void {
    this.studentForm =  this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      contact: ['', [Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(20)]],
      course:['', [Validators.required]],
      email:['', [Validators.email,Validators.required]],
      student_id:['', [Validators.required]],
      date_of_birth:['', [Validators.required]],
      gender:['', [Validators.required]],
      status:['']
    });
    this.courseForm = this.fb.group({
      course_name:['', [Validators.required]],
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
  ngAfterViewInit(): void {

    if(this.condata?.id){
      this.student = {...this.condata};
      const formValues : any= {...this.student};
      Promise.resolve().then(()=>  this.studentForm.patchValue(formValues))
    }

  }

//   public findInvalidControls() {
//     const invalid = [];
//     const controls = this.studentForm.controls;
//     for (const name in controls) {
//         if (controls[name].invalid) {
//             invalid.push(name);
//         }
//     }
//       console.log(invalid)
// }

  onAdd(){
    if(this.studentForm.valid){
      const formValues = this.studentForm.getRawValue();
      const studentData = {
        name: formValues.name,
        contact: formValues.contact,
        student_id: formValues.student_id,
        date_of_birth: formValues. date_of_birth,
        gender: formValues.gender,
        usertype: 'Student',
        email:formValues.email,
        course:formValues.course,
        status:'Active'
       }
        this.studentService.storeResource(studentData,"students/saveStudent").subscribe(
          (d: any) => {
            this.close()
            successAlert('Student Created Successfully')
          }
        )
      } }

      onUpdate(){
        const formValues = this.studentForm.getRawValue();
        const updateData = {
          id:this.student.id,
          name: formValues.name,
          contact: formValues.contact,
          student_id: formValues.student_id,
          date_of_birth: formValues. date_of_birth,
          gender: formValues.gender,
          usertype: 'Student',
          email:formValues.email,
          course:formValues.course,
          status:formValues.status,
           }
           if(this.student.id){
            this.studentService.updateResource(updateData, "updateStudent").subscribe(
              (d: any) => {
                this.close()
                successAlert('Student Updated Successfully')
             }
           )
           }

         
      }


      addToCourse(){
        if(this.courseForm.valid){
          const formValues = this.courseForm.getRawValue();
          const studentData = {
            course: formValues.course_name,
            id:this.student.id,
            student_id: this.student.student_id,
            name:this.student.name
           }
           this.studentService.updateResource(studentData, "updateStudent").subscribe(
            (d: any) => {
              this.close()
              successAlert('Course Updated Successfully')
           }
         )

        } 
      }
  

}
