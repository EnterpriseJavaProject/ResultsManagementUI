export interface CourseModule{
    id:number | string;
    module_name:string;
    module_code:string;
    // course_id:number;
    status:string;

}
export interface CardItem {
    messages: [{
      headerMessage:string,
      headerValue:string
    }];
    headerIcon: string;
    headerColor:string;
  }