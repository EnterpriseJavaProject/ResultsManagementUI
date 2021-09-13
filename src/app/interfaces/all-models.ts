export interface User{
    id?:number;
     password: string;
     email:string;
     usertype:string;
     username:string;
     fname:string;
 
 }
 export interface LoginIn{
     email:string;
     password:string;
     token?:string;
 }

 export const showButton = true