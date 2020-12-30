import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { boardRouter } from './board-routing.module';
import { BoardContainerComponent } from './board-container/board-container.component';


@NgModule({
    declarations: [BoardContainerComponent],
    imports: [
        CommonModule,
        boardRouter
    ]
})
export class BoardModule {
}
