import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient ) { }
  private apiUrl="http://localhost:3000/api/courses"
  

  // Get all lessons by course ID
  getLessonsByCourseId(courseId: string): Observable<any> {
   
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons`);
  }

  // Get lesson by ID
  getLessonById(courseId: string, lessonId: string): Observable<any> {
  
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }

  // Create new lesson (Teacher only)
  createLesson(courseId: string, title: string, content: string): Observable<any> {
    const body = { title, content }; // הסר את courseId מגוף הבקשה
    return this.http.post<any>(`${this.apiUrl}/${courseId}/lessons`, body);
  }
  // Update lesson by ID (Teacher only)
  updateLesson(courseId: string, lessonId: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, updates);
  }

  // Delete lesson by ID (Teacher only)
  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }
}


