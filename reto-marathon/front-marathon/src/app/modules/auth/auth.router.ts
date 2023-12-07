import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AuthRouter: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '', redirectTo: 'login', pathMatch: 'full'
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
            }
        ]
    }
];