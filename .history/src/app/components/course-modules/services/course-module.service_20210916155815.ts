import { Injectable } from '@angular/core';
import { moduleList } from '../utils/constants';
import { ResourceService } from '../../../services/resources';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

}
