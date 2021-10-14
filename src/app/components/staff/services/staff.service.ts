import { Injectable } from '@angular/core';
import { staffList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Staff } from '../interfaces/models';

const ENDPOINT = "staffs"

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
    return super.getResources(null,'staffs/getAllStaffs').pipe(
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
    return super.getResources(null,'staffs/countStaff')  
    }

    getInstructors(){
      return super.getResources(null,'staffs/getAllStaffs').pipe(
        map((response:any) => {
          let staffArray: any[] = response;
          return staffArray.filter(m=>m.usertype=="Instructor") as Staff[]
        }))
    }

    getStaffStats(){
      return super.getResources(null,'staffs/getAllStaffs').pipe(
        map((response:any) => {
          let responseArray: any[] = response;
          let activeArray = responseArray.filter(m=>m.status=="Active")
          let inactiveArray =responseArray.filter(m=>m.status=="InActive")
       
          return ({total:responseArray.length,active:activeArray.length,inactive:inactiveArray.length});
        })  )
    }
}
