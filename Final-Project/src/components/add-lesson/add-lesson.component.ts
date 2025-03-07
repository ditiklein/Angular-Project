import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../services/Lesson/lesson.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { log } from 'console';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, RouterLinkActive, RouterLink,
    RouterOutlet, MatInputModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent implements OnInit {

  lessonForm: FormGroup;
  courseId: string = '';
  constructor(private fb: FormBuilder, private lessonService: LessonService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') || '';
    });
  }
  onSubmit() {
    if (this.lessonForm.valid) {
      const { title, content } = this.lessonForm.value;
      this.lessonService.createLesson(this.courseId, title, content).subscribe({
        next: (response) => {
          this.router.navigate([`/navbar/${this.courseId}`]);
        },
        error: (err) => {
          console.error('Error adding lesson', err);
          alert('Failed to add lesson');
        }
      });
    }
  }

  onCancel() {
    // הוסף כאן את הלוגיקה לביטול הטופס
    console.log('Cancel button clicked');
    // לדוגמה, ניווט חזרה לעמוד הקורס
    this.router.navigate([`/navbar/${this.courseId}`]);
  }
}
