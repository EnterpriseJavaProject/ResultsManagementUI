import { Injectable } from '@angular/core';
import { courseList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

}
