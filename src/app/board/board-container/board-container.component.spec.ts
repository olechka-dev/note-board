import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardContainerComponent } from './board-container.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectNotesList } from '../store';
import { Note } from '../../core/types';
import { By } from '@angular/platform-browser';
import { BoardNoteComponent } from '../board-note/board-note.component';
import { ChangeDetectionStrategy } from '@angular/core';

const mockMatDialog = {
    open: () => {
        return {
            afterClosed: () => of()
        };
    }
};

const mockNotes: Note[] = [
    {
        id: 'abc',
        author: 'qwerty asdfg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: 1609444196954
    }
];

describe('BoardContainerComponent', () => {
    let component: BoardContainerComponent;
    let fixture: ComponentFixture<BoardContainerComponent>;
    let mockStore: MockStore;
    let modal: MatDialog;
    let mockSelector;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BoardContainerComponent, BoardNoteComponent],
            providers: [
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                provideMockStore()
            ]
        })
            .overrideComponent(BoardContainerComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardContainerComponent);
        component = fixture.componentInstance;
        mockStore = TestBed.inject(MockStore);
        spyOn(mockStore, 'dispatch');
        mockSelector = mockStore.overrideSelector(selectNotesList, []);
        modal = TestBed.inject(MatDialog);
        spyOn(modal, 'open').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display create note component', () => {
        const noteComps = fixture.debugElement.queryAll(By.directive(BoardNoteComponent));
        expect(noteComps.length).toEqual(1);
    });

    it('should display note component when note exists', () => {
        mockSelector.setResult(mockNotes);
        mockStore.refreshState();
        fixture.detectChanges();
        const noteComps = fixture.debugElement.queryAll(By.directive(BoardNoteComponent));
        expect(noteComps.length).toEqual(2);
    });

    it('should dispatch an action when deleteItem is called', () => {
        component.deleteItem('abc');
        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should open modal dialog when openNoteModal is called', () => {
        component.openNoteModal();
        expect(modal.open).toHaveBeenCalledTimes(1);
    });


});
