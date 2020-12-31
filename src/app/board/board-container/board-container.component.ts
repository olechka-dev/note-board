import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { Note, NoteUpdatePayload } from '../../core/types';
import { filter, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { createNote, deleteNote, updateNote } from '../store/actions';
import { selectNotesList } from '../store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-board-container',
    templateUrl: './board-container.component.html',
    styleUrls: ['./board-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardContainerComponent implements OnInit {
    notes$: Observable<Note[]>;

    constructor(private dialog: MatDialog,
                private store: Store<EntityState<Note>>) {
    }

    ngOnInit(): void {
        this.notes$ = this.store.pipe(
            select(selectNotesList)
        );
    }

    openNoteModal(data?: Note): void {
        const dialogRef = this.dialog.open(NoteModalComponent, {
            width: '600px',
            height: '450px',
            data
        });
        dialogRef.afterClosed()
            .pipe(
                take(1),
                filter(note => !!note)
            )
            .subscribe((note: NoteUpdatePayload) => {
                data ? this.store.dispatch(updateNote({ payload: { id: data.id, changes: { ...note } } })) :
                    this.store.dispatch(createNote({ payload: { ...note, createdAt: +new Date() } }));
            });
    }

    deleteItem(id): void {
        this.store.dispatch(deleteNote({ payload: id }));
    }

    trackNotesById(index, item): number {
        return item.id;
    }

}
