import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router, RouterLink } from '@angular/router';
export interface LoginModel {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <h1>Login</h1>
    <form (ngSubmit)="handleSubmit($event)">
     <label>Email: </label>
    <input type="email" [(ngModel)]="loginData.email" name="email">
    <p></p>
    <label>Password: </label>
    <input type="password" [(ngModel)]="loginData.password" name="password">
    <p></p>
    <button type="submit">Login</button>
    @if(error()){
      <p style="color:red">{{error()}}</p>
    }
    &nbsp; <a routerLink="/signup">Signup</a>
    </form>
  `,
  styles: ``,
})
export class Login {
  initialLoginData: LoginModel = { email: '', password: '' };
  loginData: LoginModel = this.initialLoginData;
  authService = inject(AuthService);
  router = inject(Router);
  error = signal('');

  async handleSubmit(e: Event) {
    e.preventDefault();
    try {
      await this.authService.login(this.loginData.email, this.loginData.password);
      this.router.navigate(['/people']);
    } catch (ex: any) {
      console.log({ message: ex.message });
      if (ex.message === 'EMAIL_NOT_VERIFIED') {
        this.error.set('Please verify your email before logging in.');
      } else {
        this.error.set(ex.message);
      }
    }
  }
}