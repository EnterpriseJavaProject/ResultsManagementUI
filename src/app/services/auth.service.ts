

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import {User,LoginIn} from '../interfaces/all-models'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
geturl:string='http://196.43.196.108:8012/allUsers';
addurl:string='http://196.43.196.108:8012/adduser';
loginurl:string='http://196.43.196.108:3345/authenticate';
upurl:string='http://196.43.196.108:8012/updateuserdetails';
delurl:string='http://196.43.196.108:8012/deleteuser';

private userSubject: BehaviorSubject<User>;
public user: Observable<User>;


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

constructor(private http:HttpClient,  private router: Router) { 
  this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  this.user = this.userSubject.asObservable();
}


public get userValue(): User {
  return this.userSubject.value;
}

login(userDetails) {
  return this.http.post<any>(`${environment.API_BASE}/users/authenticate`, userDetails)
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  this.userSubject.next(null);
  this.router.navigate(['/login']);
}

getUsers():Observable<User[]>{
  return this.http.get<User[]>(this.geturl);

}

getById(id: number) {
  return this.http.get<User>(`${environment.API_BASE}/users/${id}`);
}
addUser(user:User):Observable<any>{
  return this.http.post<any>(this.addurl, user)
}

edituser(user: User): Observable<any> {
  return this.http.post<any>(this.upurl , user);
}

deleteuser(user:User): Observable<any> {
  return this.http.post<any>(this.delurl,user);
}

// login(login:LoginIn):Observable<LoginIn>{
//   return this.http.post<any>(this.loginurl, login)
//   .pipe(map(user => {
//     localStorage.setItem('userinfo', JSON.stringify(user));
//     // this.loggedIn.next(true);

//     // this.userSubject.next(user);
//     return user;
// }));
// }

// loginnew(login:LoginIn) {
//   return this.http.post<any>(this.loginurl, login)
//       .pipe(map(user => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('user', JSON.stringify(user));
          
//           // this.userSubject.next(user);
//           return user;
//       }));
// }

gettoken(){
  // debugger;
    return !!localStorage.getItem("SessionUser");
}

}
