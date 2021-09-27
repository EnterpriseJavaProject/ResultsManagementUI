import { Injectable } from '@angular/core';
import { courseList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from '../interfaces/model';

const ENDPOINT = "courses"

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends ResourceService {

  constructor(http: HttpClient) { 
    super(http, ENDPOINT);
  }

  getAllCourses(){
    let coursesArray = courseList;
    return coursesArray;
  }
  getAllCourse(){
    return super.getResources(null,'courses/getAllCourses').pipe(
      map((response:any) => {
        let coursesArray: any[] = response;
        // studentsArray.map(value => {
        //   value.full_name = `${value.first_name} ${value.last_name}`;
        // });
        return coursesArray as Course[];
      })
    )
  }
  getTotalCourses(){
    return super.getResources(null,'courses/countCourses ')  
    }
}
