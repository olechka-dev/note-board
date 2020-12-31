import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Note, NoteCreatePayload } from '../../core/types';

export enum NoteActions {
    CREATE_NOTE = '[Note] Create',
    UPDATE_NOTE = '[Note] Update',
    DELETE_NOTE = '[Note] Delete'
}

export const createNote = createAction(NoteActions.CREATE_NOTE, props<{ payload: NoteCreatePayload }>());
export const updateNote = createAction(NoteActions.UPDATE_NOTE, props<{ payload: Update<Note> }>());
export const deleteNote = createAction(NoteActions.DELETE_NOTE, props<{ payload: string }>());

