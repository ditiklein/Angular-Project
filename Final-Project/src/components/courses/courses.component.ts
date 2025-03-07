import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/Course/course.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HoverDirective } from '../../Directive/hover.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';  // ✅ נוספה תמיכה בתפריט
import { MatButtonModule } from '@angular/material/button';  // ✅ נוספה תמיכה בכפתורים
import { UserService } from '../../services/User/user.service';
import { AditDialogComponent } from '../adit-dialog/adit-dialog.component';
import { log } from 'node:console';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule,    
    MatIconModule,    
    HoverDirective,  
    ErrorDialogComponent,
    MatProgressSpinnerModule,
    RouterLinkActive, 
    RouterLink,
    RouterOutlet,
    MatToolbarModule,  
    MatButtonModule 
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  
    courses: Course[] = [];
    loading: boolean = true;
    CoursesByStudent: Course[] = [];
    role: string
    constructor(private courseService: CourseService, private dialog: MatDialog, private router: Router,private serviesUser:UserService) 
    {
      this.role=sessionStorage.getItem('role')||''
    }
 
    ngOnInit(): void {
      this.loadCourses();
      this.loadCoursesByStudent();


    }
  
    loadCourses(): void {
  
      
      this.courseService.getCourses().subscribe({
        next: (data) => {
          this.courses = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching courses:', error);
          this.openErrorDialog('שגיאה בטעינת הקורסים');
          this.loading = false;
        }
      });
    }
  
    openErrorDialog(message: string): void {
      this.dialog.open(ErrorDialogComponent, {
        data: { message },
        width: '300px'
      });
    }
    Delete(id: string): void {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.courses = this.courses.filter(course => course.id !== id);
        },
        error: () => {
          this.openErrorDialog('שגיאה במחיקת הקורס');
        }
      });
    }
    
    Adit(id: string): void {
      const course: Course = this.courses.find(c => c.id === id) || { title: '', description: '', teacherId: '', id: id };
      if (!course) return;
    
      const dialogRef = this.dialog.open(AditDialogComponent, {
        width: '400px',
        data: {
          title: course.title,
          description: course.description,
          teacherId: course.teacherId // הוספת teacherId
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
    
          result.teacherId = course.teacherId; // הוספת teacherId ל-result
    
          this.courseService.updateCourse(id, result).subscribe({
            next: () => this.loadCourses(),
            error: () => this.openErrorDialog('שגיאה בעדכון הקורס')
          });
        }
      });
    }
    isUserEnrolled(courseId: string): boolean {
      
      return this.CoursesByStudent.some(course => course.id === courseId);
    }
      loadCoursesByStudent(): void {
      const studentId = sessionStorage.getItem('UserId'); // קבלת userId מ-sessionStorage
      if (studentId) {
        this.courseService.getCoursesByStudentId(studentId).subscribe({
          next: (data) => {
            this.CoursesByStudent = data;
        
          },
          error: (error) => {
            console.error('Error fetching student courses:', error);
            this.openErrorDialog('שגיאה בטעינת קורסים של סטודנט');
          }
        });
      }
    } 
    unenroll(courseId: string): void {
      const userId = sessionStorage.getItem('UserId');
      if (!userId) {
        this.openErrorDialog('שגיאה: לא נמצא מזהה משתמש.');
        return;
      }
  
      this.courseService.unenrollStudentFromCourse(courseId, userId).subscribe({
        next: () => {
          this.loadCoursesByStudent(); // רענן את רשימת הקורסים של הסטודנט
        },
        error: (error) => {
          console.error('Error unenrolling from course:', error);
          this.openErrorDialog('שגיאה: יציאה מהקורס נכשלה.');
        }
      });
    }
  
    enroll(courseId: string): void {
      const userId = sessionStorage.getItem('UserId');
      if (!userId) {
        this.openErrorDialog('שגיאה: לא נמצא מזהה משתמש.');
        return;
      }
  
      this.courseService.enrollStudentInCourse(courseId, userId).subscribe({
        next: () => {
          this.loadCoursesByStudent(); // רענן את רשימת הקורסים של הסטודנט
        },
        error: (error) => {
          console.error('Error enrolling in course:', error);
          this.openErrorDialog('שגיאה: הרשמה לקורס נכשלה.');
        }
      });
    }
  }
  
 