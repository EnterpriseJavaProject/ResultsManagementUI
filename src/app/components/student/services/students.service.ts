import { Injectable } from '@angular/core';
import { studentsList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const ENDPOINT = "students"

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
