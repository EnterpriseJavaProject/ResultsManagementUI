export enum Role {
    User = 'User',
    Admin = 'Admin'
}

// export interface User{
//     id?:number;
//      password: string;
//      email:string;
//      usertype:Role;
//      username:string;
//      fname:string;
//      token?:string;
 
//  }
 export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    usertype: Role;
    token?: string;
}
 export interface LoginIn{
     email:string;
     password:string;
     token?:string;
 }

 export const showButton = true