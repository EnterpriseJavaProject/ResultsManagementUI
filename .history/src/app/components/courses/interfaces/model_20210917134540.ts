export interface Course {
    id:number | string;
    course_name:string;
    code:string;
    course_level:string;
    users_id:number;
    course_start_date:string;
    course_end_date:string;
    certificate_issuedate:string;

}


export interface CardItem {
    messages: [{
      headerMessage:string,
      headerValue:string
    }];
    headerIcon: string;
    headerColor:string;
  }