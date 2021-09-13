export interface CourseModule{
    id:number;
    module_name:string;
    module_code:string;
    course_id:number;

}
export interface CardItem {
    messages: [{
      headerMessage:string,
      headerValue:string
    }];
    headerIcon: string;
    headerColor:string;
  }