import { Routes } from '@angular/router';
import { PersonComponent } from './person.component';

export const PersonRouter: Routes = [
    {
        path: '',
        component: PersonComponent,
        children: [
            {
                path: 'list',
                loadComponent: () => import('./pages/list-person/list-person.component').then(c => c.ListPersonComponent)
            },
            {
                path: 'user',
                loadComponent: () => import('./pages/list-user/list-user.component').then(c => c.ListUserComponent)
            }
        ]
    }
];