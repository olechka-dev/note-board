import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardContainerComponent } from './board-container/board-container.component';

const routes: Routes = [
    {
        path: '',
        component: BoardContainerComponent
    }
];

export const boardRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
