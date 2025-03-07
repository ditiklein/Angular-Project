import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SighUpComponent } from '../sigh-up/sigh-up.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [LoginComponent,SighUpComponent,MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

}
