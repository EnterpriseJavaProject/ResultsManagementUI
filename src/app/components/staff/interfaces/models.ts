export interface Staff {
  //department: any;
  id?: number;
  staff_id: string;
  //usertype: string;
  name: string;
  contact: string;
  department: string;
  course_id: number;
  email: string;
  password: string;
  reset_password_token: string;
  status: string;
}

export interface CardItem {
  messages: [
    {
      headerMessage: string;
      headerValue: string;
    }
  ];
  headerIcon: string;
  headerColor: string;
}
