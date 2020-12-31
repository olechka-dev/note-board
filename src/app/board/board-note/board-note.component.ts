import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../core/types';

@Component({
    selector: 'app-board-note',
    templateUrl: './board-note.component.html',
    styleUrls: ['./board-note.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardNoteComponent {

    @Input() data: Note;
    @Output() onDelete = new EventEmitter<string>();

    constructor() {
    }

    deleteItem() {
        this.onDelete.emit(this.data.id);
    }

}
