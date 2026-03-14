import { Injectable, signal } from '@angular/core';
import { ID, Models } from 'appwrite';
import { account } from '../shared/appwrite';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<Models.User<Models.Preferences> | null>(null);

  async signup(email: string, password: string, name: string) {
    await account.create({
      userId: ID.unique(),
      email,
      password,
      name
    });

    // create a session — required to call createEmailVerification
    await account.createEmailPasswordSession({ email, password });

    // Send verification email — redirectUrl is where user lands after clicking
    await account.createEmailVerification({ url: 'http://localhost:4200/verify-email' });

    // kill the session — user must verify before they can login  
    await account.deleteSession({ sessionId: 'current' }); // force logout until verified
  }

  async login(email: string, password: string) {
    await account.createEmailPasswordSession({ email, password });
    const user = await account.get();
    if (!user.emailVerification) {
      await account.deleteSession({ sessionId: 'current' }); // kill session immediately
      throw new Error('EMAIL_NOT_VERIFIED');
    }
    this.currentUser.set(user);
  }

  async isLoggedIn() {
    //const loggedInUser = this.currentUser();
    return !!this.currentUser();
  }

  // async getUser() {
  //   const user = await account.get();
  //   return user;
  // }

  isAdmin(): boolean {
    return this.currentUser()?.labels?.includes('admin') ?? false;
  }

  isVerified(): boolean {
    return this.currentUser()?.emailVerification ?? false;
  }

  async logout() {
    await account.deleteSession({
      sessionId: 'current'
    });
    this.currentUser.set(null);
  }

  async loadCurrentUser() {
    try {
      const user = await account.get();
      this.currentUser.set(user);
    } catch {
      this.currentUser.set(null); // no active session
    }
  }
}
