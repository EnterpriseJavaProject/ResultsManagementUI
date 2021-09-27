import { Injectable } from '@angular/core';
import { moduleList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CourseModule } from '../../../../../.history/src/app/components/course-modules/interfaces/models_20210917135700';

const ENDPOINT = "lectures"

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends ResourceService {

  constructor(http: HttpClient) { 
    super(http, ENDPOINT);
  }

  getAllModuless(){
    let modulesArray = moduleList;
    return modulesArray;
  }


  getAllModules(){
    return super.getResources(null,'modules/getAllModules').pipe(
      map((response:any) => {
        let modulesArray: any[] = response;
        // studentsArray.map(value => {
        //   value.full_name = `${value.first_name} ${value.last_name}`;
        // });
        return modulesArray as CourseModule[];
      })
    )
  }


getTotalModules(){
return super.getResources(null,'modules/countModules')  
}


}
