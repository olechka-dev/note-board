import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'board',
        pathMatch: 'full'
    },

];

export const appRouter: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
