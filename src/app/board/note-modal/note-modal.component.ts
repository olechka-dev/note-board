import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../core/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-note-modal',
    templateUrl: './note-modal.component.html',
    styleUrls: ['./note-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteModalComponent implements OnInit {

    noteForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Note,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.noteForm = this.fb.group({
            author: [this.data?.author, [Validators.required, Validators.pattern(/\S+/)]],
            text: [this.data?.text, [Validators.required, Validators.pattern(/\S+/)]]
        });
    }

}
