import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';



export class ResourceService {

  constructor(protected http: HttpClient, protected endpoint: string, ) { }

  getOneResource(overwriteUrl?: string ){

  }

  getResources(pagination?: { page: string|any; pageSize: string|any}, overwriteUrl?: string , sendPage: boolean = true){
    pagination = sendPage === false? null:
    pagination ?
    pagination: {page: 1, pageSize: DEFAULT_PAGE_SIZE };
    return this.http.get(`${environment.API_BASE}/${overwriteUrl || this.endpoint}`, { params: pagination})
  }

  storeResource(toStore: any, overwriteUrl?: string ){
    return this.http.post(`${environment.API_BASE}/${overwriteUrl || this.endpoint}`, toStore)

  }

  updateResource(toStore: any, id: any, overwriteUrl?: string ){
    return this.http.patch(`${environment.API_BASE}/${overwriteUrl || this.endpoint+'/'+ id }`, toStore)

  }

  deleteResource(id, overwriteUrl?: string ){
    return this.http.delete(`${environment.API_BASE}/${overwriteUrl || this.endpoint+'/'+id}`)

  }

  customUpdate(){

  }



}