import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  hide = true;
  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm =  this.fb.group({
      email:['', [Validators.email,Validators.required]],
      password:['', [Validators.required]],

    });
  }
login(){
  console.log(this.loginForm.value)
}
}
