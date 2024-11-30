import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {LOCALBASEURL} from  '../../constant/BusConstant'
import {User} from  '../../models/User'

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }
  

  registerUser(user:User) : any{
    const email = user.email
    const password = user.password;
    const firstName = user.firstName;
    const lastName = user.lastName;
    
    const body = new HttpParams()
    .set('email', email)
    .set('password', password)
    .set('firstName', firstName)
    .set('lastName', lastName);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const register = this.http.post(
      `${LOCALBASEURL}auth/register`,
      body.toString(),
      { headers }
    );
    return register;
  }
  login(email:string,password:string){
    const body = new HttpParams()
    .set('email',email)
    .set('password',password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const login = this.http.post(
      `${LOCALBASEURL}auth/login`,
      body.toString(),
      { headers }
    );
    return login;
  }
}
