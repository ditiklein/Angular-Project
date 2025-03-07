import { CanActivateFn } from '@angular/router';

export const teacherGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('role')=='teacher')
    return true;
  return false;
};
