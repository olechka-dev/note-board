import { notesAdapter } from './reducers';
import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Note } from '../../core/types';

const {
    selectAll
} = notesAdapter.getSelectors();

export const selectNotesState = createFeatureSelector<EntityState<Note>>('notes');

export const selectNotesList = createSelector(selectNotesState, selectAll);
