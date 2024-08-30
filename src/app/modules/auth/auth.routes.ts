import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const authRoutes: Routes = [
    {
        path: 'login',
        component: AuthPageComponent,
    },
    {
        path: '**',
        redirectTo: '/auth/login',
    },
];
