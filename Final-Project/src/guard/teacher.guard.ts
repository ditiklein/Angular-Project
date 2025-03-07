import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/User/user.service';

export const teacherGuard: CanActivateFn = (route, state) => {
  const userservice=inject(UserService)
  if(sessionStorage.getItem('role')=='teacher')
  return true;

  return true;
};
