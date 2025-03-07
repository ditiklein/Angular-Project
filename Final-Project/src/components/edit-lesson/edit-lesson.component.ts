import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [MatIconModule,    ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,    MatCardModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent {
  lessonForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLessonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.lessonForm = this.fb.group({
      title: [data.title, Validators.required],
      content: [data.content, Validators.required]
    });
  }

  save(): void {
    if (this.lessonForm.valid) {
      this.dialogRef.close(this.lessonForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
