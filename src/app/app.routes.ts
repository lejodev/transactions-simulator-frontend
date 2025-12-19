import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'history',
        loadComponent: () => import('./features/transactions/pages/transactions-history/transactions-history.component').then(m => m.TransactionsHistoryComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
