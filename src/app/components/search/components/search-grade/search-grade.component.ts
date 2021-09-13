import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-grade',
  templateUrl: './search-grade.component.html',
  styleUrls: ['./search-grade.component.css']
})
export class SearchGradeComponent implements OnInit {
  searchForm:FormGroup;
  classroom = [
    { id: 1, name: "Creche" },
    { id: 2, name: "Nursery 1" },
    { id: 3, name: "Nursery 2" },

  
  ];  constructor( private fb: FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.searchForm =  this.fb.group({
      student_id:['', [Validators.required]],
      course_id:['', [Validators.required]],

    });
  }

}
