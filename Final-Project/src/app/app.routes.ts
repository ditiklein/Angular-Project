import { Routes } from '@angular/router';
import { ButtonComponent } from '../components/button/button.component';
import { LoginComponent } from '../components/login/login.component';
import { SighUpComponent } from '../components/sigh-up/sigh-up.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { AddTeacherComponent } from '../components/add-teacher/add-teacher.component';
import { teacherGuard } from '../guard/teacher.guard';
import { ShowCourseComponent } from '../components/show-course/show-course.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';


export const routes: Routes = [
  { path: '', component: ButtonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SighUpComponent },
  { path: 'navbar', component: NavbarComponent,
    children: [
      {path: 'courses', component: CoursesComponent,},
      { path: 'home', component: HomeComponent },
      { path: 'addCourse', component: AddTeacherComponent, canActivate: [teacherGuard] },
      { path: ':id', component: ShowCourseComponent },
      { path: 'AddLesson/:id', component: AddLessonComponent }
    ]
  },
];
