import { Injectable } from '@angular/core';
import { staffList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Staff } from '../interfaces/models';

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

  getAllStaffs(){
    return super.getResources(null,'sts/getAllStudent').pipe(
      map((response:any) => {
        let staffArray: any[] = response;
        // studentsArray.map(value => {
        //   value.full_name = `${value.first_name} ${value.last_name}`;
        // });
        return staffArray as Staff[];
      })
    )
  }
  getTotalStaff(){
    return super.getResources(null,'students/countStudent')  
    }

}
