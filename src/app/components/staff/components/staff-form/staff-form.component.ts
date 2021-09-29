import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Staff } from '../../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StaffListComponent } from '../staff-list/staff-list.component';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from '../../../../services/custom-validation'; 
import { CoursesService } from '../../../courses/services/course.service';
import { StaffService } from '../../services/staff.service';
import { successAlert } from 'src/app/utils/constants';


@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

errors = errorMessages;
  usertypes = [
    { id: 1, name: "Instructor" },
    { id: 2, name: "Course Cordinator" },
    { id: 3, name: "Director of Studies" },
    {id:4, name:"Academic Secretary"}
  
  ];
  statusList=[
    {"name": "Active", "value":"Active"},
    {"name": "InActive",  "value": "InActive"}
  ]
  @Input()
  addOnlyForm: boolean = false;
  addCourseForm: boolean = false;
  updateOnlyForm:boolean = false;

  staffForm:FormGroup;
  courseForm:FormGroup;
courseList:any[]
  staff:Staff;
condata:any;
tyye:any
  constructor(
    private fb: FormBuilder,
  private courseService:CoursesService,
    private dialogRef: MatDialogRef<StaffListComponent>,
    private staffService:StaffService,
    @Inject(MAT_DIALOG_DATA) data,
  ) {this.condata = data,
  this.tyye=data.type }

  ngOnInit(): void {
    this.staffForm =  this.fb.group({
      staff_id:['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email:['', [Validators.email,Validators.required]],
      contact: ['', [Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(20)]],
      usertype:['', [Validators.required]],
      course:[''],
      status:[''],
      password:['', [Validators.required]],


    });
    this.courseForm = this.fb.group({
      course:['', [Validators.required]],
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
    if(this.condata?.id){
      this.staff = {...this.condata};
      const formValues : any= {...this.staff};
      Promise.resolve().then(()=>  this.staffForm.patchValue(formValues))
    }
  }

 
  
  onAdd(){
    if(this.staffForm.valid){
      const formValues = this.staffForm.getRawValue();
      const staffData = {
        staff_id: formValues.staff_id,
        name: formValues.name,
        email:formValues.email,
        contact: formValues.contact,
        usertype: formValues.usertype,
        course:formValues.course,
        status:'Active',
       }
       const userData ={
        password:formValues.password,
        email:formValues.email,
        usertype: formValues.usertype,
        status:'Active',
        staff_id:formValues.staff_id

       }
       this.staffService.storeResource(userData,"users/saveUsers").subscribe(
        (d: any) => {
console.log('doine')
              // this.close()
              // successAlert('Staff Created Successfully')
             }
       )

        this.staffService.storeResource(staffData,"staffs/saveStaff").subscribe(
          (d: any) => {

            this.close()
            successAlert('Staff Created Successfully')
          }
        )
      }
     }


      onUpdate(){
        const formValues = this.staffForm.getRawValue();
        const updateData = {
          id:this.staff.id,
          staff_id: formValues.staff_id,
          name: formValues.name,
          email:formValues.email,
          contact: formValues.contact,
          usertype: formValues.usertype,
          course:formValues.course,
          password:formValues.password,
          status:formValues.status
           }
           if(this.staff.id){
            this.staffService.updateResource(updateData, "updateStaff").subscribe(
              (d: any) => {
                this.close()
                successAlert('  Staff Updated Successfully')
             }
           )
           }

         
      }

}
