import { Roles } from "./EnumRole";

export class user{
    constructor(
       public name:string,
       public email:string,
       public password:string,
       public role:Roles
    ){}
}