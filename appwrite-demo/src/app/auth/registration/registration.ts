import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '../auth-service';

export interface SignupModel {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink],
  template: `
    <h1>Signup</h1>
   <form #signupForm="ngForm" (ngSubmit)="handleSubmit($event)">
    Name: <input type="text" name="name" placeholder="Name" [(ngModel)]="signupData.name"
    #name="ngModel" required maxlength="40">
    @if(name.invalid && name.touched){
      <p> Name is required (max 40 chars) </p>
    }
    <p></p>
    Email: <input type="email" name="email" placeholder="Email" [(ngModel)]="signupData.email" #email="ngModel" required maxlength="40">
    @if(email.invalid && email.touched){
      <p>Email is required (max 40 chars)<p>
    }
    <p></p>
    Password: <input type="password" name="email" placeholder="Password" [(ngModel)]="signupData.password" #password="ngModel" required maxlength="40">
@if(password.invalid && password.touched){
<p>Password is invalid</p>
}
    <p></p>

    <button type="submit" [disabled]="signupForm.invalid">Signup</button>
    &nbsp;
    <a routerLink="/login">Login</a>

    @if(message()){
      <p>{{message()}}</p>
    }
   </form>
  `,
  styles: ``,
})
export class Registration {
  initSignupData: SignupModel = { name: '', email: '', password: '' };
  signupData = this.initSignupData;
  authService = inject(AuthService);
  message = signal("");

  async handleSubmit($event: Event) {
    try {
      this.message.set("wait...");
      $event.preventDefault();
      await this.authService.signup(this.signupData.email, this.signupData.password, this.signupData.name);
      this.signupData = this.initSignupData;
      this.message.set("Signup successful! Please verify the email address.");
    }
    catch (ex: any) {
      console.log(ex);
      this.message.set(ex.message);
    }
  }

}
