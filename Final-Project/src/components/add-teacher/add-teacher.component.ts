import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/Course/course.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [ReactiveFormsModule, 
 CommonModule, 
      MatFormFieldModule,MatInputModule,
          MatButtonModule,MatIconModule,
          MatCardModule,RouterLinkActive, 
          RouterLink,
          RouterOutlet],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder,private courseService: CourseService,private router: Router) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const { title, description } = this.courseForm.value; // כאן התיקון!
      console.log("=============");
      
      console.log(title);
      console.log(description);

      
      this.courseService.addCourse(title, description).subscribe({
        next: (response) => {
          console.log(response.message);
          this.router.navigate(['/navbar/courses']);
        },
        error: (err) => {
          console.error('Error adding course', err);
          alert('Failed to add course');
        }
      });
    }
  }
  onCancel() {
    this.router.navigate(['/navbar/courses']); }
  }
