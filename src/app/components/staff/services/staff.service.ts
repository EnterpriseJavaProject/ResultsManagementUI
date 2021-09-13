import { Injectable } from '@angular/core';
import { staffList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const ENDPOINT = "lectures"

@Injectable({
  providedIn: 'root'
})
export class StaffService extends ResourceService {

  constructor(http: HttpClient) { 
    super(http, ENDPOINT);
  }

  getAllStaff(){
    let staffArray = staffList;
    return staffArray;
  }

}
