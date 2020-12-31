export interface NoteUpdatePayload {
    author: string;
    text: string;
}

export interface NoteCreatePayload extends NoteUpdatePayload {
    createdAt: number;
}

export interface Note extends NoteCreatePayload {
    id: string;
    createdAt: number;
}
