import { Routes } from '@angular/router';
import { loggedGuard } from './modules/person/guard/logged.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'auth', pathMatch: 'full'
    },
    {
        path: 'auth', loadChildren: () => import('./modules/auth/auth.router').then(c => c.AuthRouter)
    },
    {
        path: 'person',
        loadChildren: () => import('./modules/person/person.router').then(c => c.PersonRouter),
        canActivate: [loggedGuard]
    }
];
