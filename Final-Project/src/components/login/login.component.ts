import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { UserService } from '../../services/User/user.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { log } from 'console';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,MatIconModule,MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(private fb: FormBuilder,private userService: UserService,private router: Router,private dialog: MatDialog) {
  }
  change(){
    this.router.navigate(['/register']);

  }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      userGroup: this.fb.group({ // 💡 יש לוודא שהשם תואם גם ב-HTML
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    });
         

  }

    openErrorDialog(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
          data: { message },
          width: '300px'
        });
      }
  onSubmit() {
    
      if (this.addUserForm.valid) {
        const userData = this.addUserForm.get('userGroup')?.value;
       this.userService.loginUser(userData).subscribe({
        next: (response) => {
          sessionStorage.setItem('UserName', userData.email);

          sessionStorage.setItem('token',response.token);
          sessionStorage.setItem('role',response.role);
          sessionStorage.setItem('UserId',response.userId);
     
          
          this.router.navigate(['/navbar/home']); 
        },
        error: (err) => {
          this.openErrorDialog('Error:You need to register ');
        }
      });


  }


}
  }
