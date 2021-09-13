

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import {User,LoginIn} from '../interfaces/all-models'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
geturl:string='http://196.43.196.108:8012/allUsers';
addurl:string='http://196.43.196.108:8012/adduser';
loginurl:string='http://196.43.196.108:3345/authenticate';
upurl:string='http://196.43.196.108:8012/updateuserdetails';
delurl:string='http://196.43.196.108:8012/deleteuser';




httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

constructor(private http:HttpClient,  private router: Router) { }





getUsers():Observable<User[]>{
  return this.http.get<User[]>(this.geturl);

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

login(login:LoginIn):Observable<LoginIn>{
  return this.http.post<any>(this.loginurl, login)
  .pipe(map(user => {
    localStorage.setItem('userinfo', JSON.stringify(user));
    // this.loggedIn.next(true);

    // this.userSubject.next(user);
    return user;
}));
}

loginnew(login:LoginIn) {
  return this.http.post<any>(this.loginurl, login)
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          
          // this.userSubject.next(user);
          return user;
      }));
}

gettoken(){
  // debugger;
    return !!localStorage.getItem("SessionUser");
}

logout() {                            // {4}
localStorage.clear();
// this.loggedIn.next(false);
this.router.navigate(['/login']);
}
}
