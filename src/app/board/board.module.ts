import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { boardRouter } from './board-routing.module';
import { BoardContainerComponent } from './board-container/board-container.component';
import { BoardNoteComponent } from './board-note/board-note.component';
import { NoteModalComponent } from './note-modal/note-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NotesReducer } from './store/reducers';
import { MatIconModule } from '@angular/material/icon';
import { notesMetaReducer } from './store/metareducers';


@NgModule({
    declarations: [BoardContainerComponent, BoardNoteComponent, NoteModalComponent],
    imports: [
        CommonModule,
        boardRouter,
        MatDialogModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('notes', NotesReducer, {metaReducers: [notesMetaReducer]})
    ]
})
export class BoardModule {
}
