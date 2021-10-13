export interface CourseModule{
    id:number | string;
    module_name:string;
    course_name:string;
    course_id:number;
    staff_name:string;
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