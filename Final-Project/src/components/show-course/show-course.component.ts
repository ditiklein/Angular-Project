import { Component } from '@angular/core';
import { Course } from '../../models/Course';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CourseService } from '../../services/Course/course.service';
import { LessonService } from '../../services/Lesson/lesson.service';
import { Lesson } from '../../models/Lessons';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-show-course',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,RouterLinkActive, 
    RouterLink,
    RouterOutlet,MatIconModule, MatButtonModule, FormsModule,ErrorDialogComponent],
  templateUrl: './show-course.component.html',
  styleUrl: './show-course.component.css'
})
export class ShowCourseComponent {
  courseId: string = '';
  course!: Course  // משתנה course שיכול להיות null או מסוג Course
  lessons: Lesson[] = [];
  CoursesByStudent: Course[] = [];
role!: string
  constructor( private dialog: MatDialog,private activatedRoute: ActivatedRoute, private coursesService: CourseService,private lessonservies:LessonService   ,private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') || ''; 
    this.role=sessionStorage.getItem('role')||''
      if (this.courseId) {
        
        this.getCourseDetails();
        this.loadLesson();
        // קריאה לפונקציה אחרי שקיבלנו את ה-ID
      }
    });


    
  }

  getCourseDetails(): void {
    
    
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (data) => {
        this.course = data;
        console.log( this.course );
        
      },
      error: (error) => {
        console.error('Error fetching course:', error);
      }
    });
  }    
  

  loadLesson(): void {
   this.lessonservies.getLessonsByCourseId(this.courseId).subscribe({
      next: (data) => {
        console.log("Data from server:", data); // הוסף את זה

        this.lessons = data;
        
        
        
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        
      }
    });
  }
  deleteLesson(lesson:Lesson )
  {
     this.lessonservies.deleteLesson(lesson.courseId,lesson.id).subscribe({
        next: () => {
          this.lessons = this.lessons.filter(l => l.id !== lesson.id);
        },
        error: () => {
          // this.openErrorDialog('שגיאה במחיקת הקורס');
        }
      });
    }
  editLesson(Lesson:Lesson ): void {
      const lesson: Lesson = this.lessons.find(c => c.id === Lesson.id)||{title:
        '',
        content: '',
        courseId: '',
        id: ''
      } 
      if (!lesson) return;
    
      const dialogRef = this.dialog.open(EditLessonComponent, {
        width: '400px',
        data: {
          title: lesson.title,
          content: lesson.content,
          courseId: lesson.courseId ,
          id:lesson.id
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
    
          result.courseId = lesson.courseId; 
          result.id = lesson.id; 

    
          this.lessonservies.updateLesson(Lesson.courseId,Lesson.id ,result).subscribe({
            next: () => this.loadLesson(),
            // error: () => this.openErrorDialog('שגיאה בעדכון הקורס')
          });
        }
      });
    }



  }





