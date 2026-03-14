import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { account } from '../shared/appwrite';

@Component({
    selector: 'app-verify-email',
    template: `
    @if(verifying()) { <p>Verifying your email...</p> }
    @if(success()) { <p>Email verified! <a routerLink="/login">Login now</a></p> }
    @if(error()) { <p>Verification failed: {{ error() }}</p> }
  `
})
export class VerifyEmailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    verifying = signal(true);
    success = signal(false);
    error = signal<string | null>(null);

    async ngOnInit() {
        const userId = this.route.snapshot.queryParamMap.get('userId');
        const secret = this.route.snapshot.queryParamMap.get('secret');

        if (!userId || !secret) {
            this.error.set('Invalid verification link.');
            this.verifying.set(false);
            return;
        }

        try {
            await account.updateEmailVerification({ userId, secret });
            this.success.set(true);
        } catch (ex: any) {
            this.error.set(ex.message);
        } finally {
            this.verifying.set(false);
        }
    }
}