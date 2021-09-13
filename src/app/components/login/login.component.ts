import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
// import { errorAlert, loginAlert } from 'src/app/utils/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  constructor( private fb: FormBuilder,
    private router:Router,
    private http:HttpClient,
    private loginService:AuthService
    
    ) { }

  ngOnInit(): void {
    this.loginForm =  this.fb.group({
      email:['', [Validators.email,Validators.required]],
      password:['', [Validators.required]],

    });
  }


// login(){
//   this.loginForm.setErrors(null);
//   if(this.loginForm.valid){
//     // console.log('form is valid')
//     this.loginService.login(this.loginForm.value).
//     pipe(
//       catchError(err => of(false))
//     ).
//     subscribe(
//       success => {
//         // console.log(success);
//         if (success){
//           return(
        
//           loginAlert() ,         
//             this.router.navigate(['/dashboard']))
//         }else {
//           this.loginForm.setErrors({invalid: true});
//         errorAlert('ion')       }
//       }
//     )
//   }
// }
login(){
  this.loginService.login(this.loginForm.value)
  .subscribe(
      data => {
    
        this.router.navigate(['/dashboard'])
        console.log(data);

      },
      error => {
        if (error.status === 400){
         Swal.fire({
           title: 'Error!',
           text: 'User Does not Exist',
           icon: 'error',
           confirmButtonText: 'Exit'
         })   
         }
      }
   
  )
}
search(){
  
 
  
 this.router.navigate(['/search-grade']) 
}
}
