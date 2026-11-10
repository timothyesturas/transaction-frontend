import { Routes } from '@angular/router';
import { Transactions } from './pages/transactions/transactions';

export const routes: Routes = [
    {
        path: '',
        component: Transactions
    },
    {
        path: '**',
        redirectTo: ''
    }
];
