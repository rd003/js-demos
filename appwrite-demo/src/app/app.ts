import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from './auth/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
     @if(isLoggedIn()){
        Welcome {{userName()}} &nbsp;
        @if(authService.isAdmin()){
          <span> (Admin) </span>
        }
         <button (click)="logout()">Logout</button>
     }
     <router-outlet/>
  `,
  styles: [],
})
export class App implements OnInit {
  authService = inject(AuthService);
  isLoggedIn = signal(false); // it should be a global state, otherwise you need to reload the page post login
  userName = signal(''); // it should be a global state, otherwise you need to reload the page post login
  router = inject(Router);

  async ngOnInit() {
    setTimeout(async () => {
      await this.authService.loadCurrentUser();
      const user = this.authService.currentUser;
      if (user()) {
        this.isLoggedIn.set(!!user());
        this.userName.set(user()!.email);
      }
    }, 0);

  }

  async logout() {
    await this.authService.logout();
    this.isLoggedIn.set(false);
    this.userName.set('');
    this.router.navigate(['/login']);
  }

}
