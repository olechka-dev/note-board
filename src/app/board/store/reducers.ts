import { Action, createReducer, on } from '@ngrx/store';
import { createNote, deleteNote, updateNote } from './actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Note } from '../../core/types';

const sortByCreatedAtDesc = (item1: Note, item2: Note) => {
    return item2.createdAt - item1.createdAt;
};

export const notesAdapter = createEntityAdapter<Note>({
    sortComparer: sortByCreatedAtDesc
});

const initNotesState: EntityState<Note> = notesAdapter.getInitialState();

const _notesReducer = createReducer(initNotesState,
    on(createNote, (state, { payload }) => notesAdapter.addOne({ id: btoa(`${payload.createdAt}`), ...payload }, state)),
    on(updateNote, (state, { payload }) => notesAdapter.updateOne(payload, state)),
    on(deleteNote, (state, { payload }) => notesAdapter.removeOne(payload, state))
);

export function NotesReducer(state: EntityState<Note>, action: Action) {
    return _notesReducer(state, action);
}
