import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { UserDto } from '../types/dtos';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host: string = `${environment.apiHost}/users`;
  private userSubject: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(
    undefined
  );
  public user: Observable<UserDto> = this.userSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    const userData: UserDto = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.userSubject.next(userData);
    }
  }

  public get getUser() {
    return this.userSubject.getValue();
  }

  public set setUser(value: UserDto) {
    this.userSubject.next(value);
  }

  public login = (email: string, password: string): Observable<UserDto> =>
    this.http.post(`${this.host}/login`, { email, password }).pipe(
      map((res: UserDto) => {
        this.userSubject.next(res);
        localStorage.setItem('user', JSON.stringify(res));
        return res;
      })
    );

  public logout = () => {
    this.userSubject.next(undefined);
    localStorage.clear();
    this.router.navigate(['/auth']);
  };
}
