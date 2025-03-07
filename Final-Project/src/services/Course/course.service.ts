import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/Course';
import { log } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
return this.http.get<any>(this.apiUrl);
  }
  addCourse(title: String, description: String,): Observable<any> 
  {
    const userId=sessionStorage.getItem('UserId');
    const body = { title, description ,userId};
    
    
    
    return this.http.post<any>(this.apiUrl, body);
  }
  updateCourse(id: string, updates: any): Observable<any> {
     return this.http.put(`${this.apiUrl}/${id}`, updates); 
  }

  deleteCourse(id: string): Observable<any> {
   
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getCourseById(id: string): Observable<Course> {
    
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }
  enrollStudentInCourse(courseId: string, userId: string): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  unenrollStudentFromCourse(courseId: string, userId: string): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {  body: { userId } });
  }

  getCoursesByStudentId(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/${studentId}`);
  }
}




