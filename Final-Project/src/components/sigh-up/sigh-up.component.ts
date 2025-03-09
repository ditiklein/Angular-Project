import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Roles } from '../../models/EnumRole'; import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/User/user.service';
import { log } from 'console';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-sigh-up',
  standalone: true,
  imports: [  ReactiveFormsModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatOptionModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatDialogModule, 
    ErrorDialogComponent
  
  ],
  templateUrl: './sigh-up.component.html',
  styleUrl: './sigh-up.component.css'
})
export class SighUpComponent implements OnInit {
  addUserForm!: FormGroup;
  roles = Object.values(Roles).filter(value => typeof value === 'string') as string[];
  loading: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private dialog: MatDialog,private router: Router) {
  }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      userGroup: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', Validators.required]
      })
    });
  }
  change(){
    this.router.navigate(['/login']);

  }
  onSubmit() {

    if (this.addUserForm.valid) {
      const userData = this.addUserForm.get('userGroup')?.value;
if(userData)

      console.log('📤 שולחת לשרת:', userData);

      this.userService.registerUser(userData.name, userData.email, userData.password, userData.role).subscribe({
          next: (response) => {
        
            console.log(response.token);

           this.router.navigate(['/login']);

        },
        error: (err) => {
          if (err.status) {
            switch (err.status) {
              case 404:
                console.error('Error fetching courses:', err);
                this.openErrorDialog('שגיאה בטעינת הקורסים');
                this.loading = false;
                break;
              case 500:
                console.error('Error: You need to login:', err);
                this.openErrorDialog('Error: You need to login');
                this.loading = false;
                break;
              default:
                this.openErrorDialog(`Unexpected error: ${err.message}`);
              }
          } else {
            this.openErrorDialog('Network error. Please check your internet connection.');

          }

        }
      });

    }
  }
  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '300px'
    });
  }
}