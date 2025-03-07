import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient) {}

  registerUser( name: string,email: string, password: string, role: string ): Observable<any> 
  {
    const user ={name,email,password,role}
    return this.http.post<any>(`${this.apiUrl}/register`,user);
  }
  loginUser(credentials: { email: string; password: string }): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

}
