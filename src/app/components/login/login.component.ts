import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';
import { loginAlert, errorAlert } from 'src/app/utils/constants';
// import { errorAlert, loginAlert } from 'src/app/utils/constants';
import Swal from 'sweetalert2';
import { StaffService } from '../staff/services/staff.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  redirect = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private staffService: StaffService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // if(this.loginService?.loggedInUser?.email){
    //   this.router.navigate([this.redirect])
    // }

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    var formValues = this.loginForm.getRawValue();
    var email = formValues.email;
    var password = formValues.password;
    if (this.loginForm.valid) {
      this.staffService
        .login(email, password)
        .pipe(first())
        .subscribe({
          next: (ad) => {
            var name = localStorage.getItem('user');
            console.log(typeof ad);

            if (ad === undefined) {
              errorAlert('User not found');
              console.log(typeof ad);

              // this.router.navigate(['/dashboard']);
            } else {
              console.log(typeof ad);
              loginAlert();
              window.location.assign('/dashboard');
            }
          },
          error: (error) => {
            console.log(error);
            errorAlert('User not found');

            // if (error.status === 400) {
            //   Swal.fire({
            //     title: 'Error!',
            //     text: 'User Does not Exist',
            //     icon: 'error',
            //     confirmButtonText: 'Exit',
            //   });
            // }
          },
        });
    }

    //  if (this.loginForm.valid) {
    //    this.authenticationService
    //      .login(email, password)
    //      .pipe(first())
    //      .subscribe({
    //        next: () => {
    //          this.router.navigate(['/dashboard']);
    //          loginAlert();
    //          // get return url from query parameters or default to home page
    //          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    //          // this.router.navigateByUrl(returnUrl);
    //        },
    //        error: (error) => {
    //          if (error.status === 400) {
    //            Swal.fire({
    //              title: 'Error!',
    //              text: 'User Does not Exist',
    //              icon: 'error',
    //              confirmButtonText: 'Exit',
    //            });
    //          }
    //        },
    //      });
    //  }
  }






  emailverification() {
    var formValues = this.loginForm.getRawValue();
    var email = formValues.email;
    if (this.loginForm.valid) {
      this.staffService
        .emailverification(email)
        .pipe(first())
        .subscribe({
          next: (ad) => {
            var name = localStorage.getItem('user');
            console.log(typeof ad);

            if (ad === undefined) {
              errorAlert('Could not find any staff with email ' + email);
              console.log(typeof ad);

              // this.router.navigate(['/dashboard']);
            } else {
              console.log(typeof ad);
              loginAlert();
              window.location.assign('/dashboard');
            }
          },
          error: (error) => {
            console.log(error);
            errorAlert('Could not find any staff with email ' + email);

            // if (error.status === 400) {
            //   Swal.fire({
            //     title: 'Error!',
            //     text: 'User Does not Exist',
            //     icon: 'error',
            //     confirmButtonText: 'Exit',
            //   });
            // }
          },
        });
    }

    //  if (this.loginForm.valid) {
    //    this.authenticationService
    //      .login(email, password)
    //      .pipe(first())
    //      .subscribe({
    //        next: () => {
    //          this.router.navigate(['/dashboard']);
    //          loginAlert();
    //          // get return url from query parameters or default to home page
    //          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    //          // this.router.navigateByUrl(returnUrl);
    //        },
    //        error: (error) => {
    //          if (error.status === 400) {
    //            Swal.fire({
    //              title: 'Error!',
    //              text: 'User Does not Exist',
    //              icon: 'error',
    //              confirmButtonText: 'Exit',
    //            });
    //          }
    //        },
    //      });
    //  }
  }



  search() {
    this.router.navigate(['/search-grade']);
  }
}
