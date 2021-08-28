import { AfterViewInit, Component, Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseModule } from '../interfaces/models';
import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseModuleListComponent } from '../course-module-list/course-module-list.component';

@Component({
  selector: 'app-course-module-form',
  templateUrl: './course-module-form.component.html',
  styleUrls: ['./course-module-form.component.css']
})
export class CourseModuleFormComponent implements OnInit {
  @Input()
  addOnlyForm: boolean = false;

  moduleForm:FormGroup;
  course_module:CourseModule;
  condata:[];
  tyye:any

  constructor(    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseModuleListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.condata = data.rowData,
    this.tyye=data.type }

  
    ngOnInit(): void {
 
      this.moduleForm =  this.fb.group({
        module_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        course_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        module_code: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.required]],
        lecture:['', [Validators.required]],
        // start_date:['', [Validators.required]],
        // end_date:['', [Validators.required]],
        // certificate_issuedate:['', [Validators.required]],
  
  
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
        
  
        this.moduleForm.patchValue(this.condata)
    
      }
    }
  }
  