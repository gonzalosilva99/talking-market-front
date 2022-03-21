import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../types/dtos';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user: UserDto = this.authService.getUser;
    if (user) {
      const token: any = jwt_decode(user.token);
      const actualDate = Date.now() / 1000;
      if (state.url.startsWith('/home') && token?.exp < actualDate) {
        this.authService.setUser = undefined;
        localStorage.clear();
        this.router.navigate(['/auth']);
        return false;
      } else if (state.url.startsWith('/auth') && token?.exp > actualDate) {
        this.router.navigate(['/home']);
      }
    }
    return true;
  }
}
