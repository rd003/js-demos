import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { authGuard } from './auth/auth-guard';
import { VerifyEmailComponent } from './auth/verify-email';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'signup',
        loadComponent: () => import('./auth/registration/registration').then(c => c.Registration)
    },
    {
        path: 'people',
        loadComponent: () => import('./person/person-component').then(c => c.PersonComponent),
        canActivate: [authGuard]
    },
    { path: 'verify-email', component: VerifyEmailComponent },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];