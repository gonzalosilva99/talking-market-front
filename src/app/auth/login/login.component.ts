import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.setForm();
  }

  public setForm = () => {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  };

  public login = async () => {
    try {
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password).subscribe((res) => {
        this.router.navigate(['/home']);
      });
    } catch (error) {
      console.error(error);
    }
  };
}
