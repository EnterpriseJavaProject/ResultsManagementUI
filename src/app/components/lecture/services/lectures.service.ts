import { Injectable } from '@angular/core';
import { lectureList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const ENDPOINT = "lectures"

@Injectable({
  providedIn: 'root'
})
export class LEcturesService extends ResourceService {

  constructor(http: HttpClient) { 
    super(http, ENDPOINT);
  }

  getAllLecturers(){
    let lecturersArray = lectureList;
    return lecturersArray;
  }

}
