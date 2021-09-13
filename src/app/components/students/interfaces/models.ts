export interface Student{
    id:number;
    users_id:number;
    full_name:string;
    student_id:string;
    date_of_birth:string;
    contact:string;
    email:string;
    gender:string;
    course_id:string;
    usertype:string;
    password:string;
    

}

export interface CardItem {
    messages: [{
      headerMessage:string,
      headerValue:string
    }];
    headerIcon: string;
    headerColor:string;
  }