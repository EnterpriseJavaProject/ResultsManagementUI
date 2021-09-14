import { Injectable } from '@angular/core';
import { studentsList } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResourceService } from 'src/app/services/resources';
import { Student } from '../interfaces/models';

const ENDPOINT = "student"

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends ResourceService {

  constructor(http: HttpClient) { 
    super(http, ENDPOINT);
  }

  getAllStudents(){
    let studentsArray = studentsList;
    return studentsArray;
  }

  getAllStudent(){
    return super.getResources(null,'student/getAllStudent').pipe(
      map((response:any) => {
        let studentsArray: any[] = response;
        // studentsArray.map(value => {
        //   value.full_name = `${value.first_name} ${value.last_name}`;
        // });
        return studentsArray as Student[];
      })
    )
  }
}
