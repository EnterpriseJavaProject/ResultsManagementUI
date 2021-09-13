import { Injectable } from '@angular/core';
import { studentsList } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResourceService } from 'src/app/services/resources';

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


}
