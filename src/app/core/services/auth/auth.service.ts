import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

const MOCK_USER = {
    username: 'test',
    password: 'qwerty'
};

const AUTH_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    signIn(username, password): Observable<boolean> {
        if (username === MOCK_USER.username && password === MOCK_USER.password) {
            const token = btoa(username); // simulate token that suppose to be received from server
            localStorage.setItem(AUTH_KEY, token);
            return of(true);
        }
        return throwError('Access denied');
    }

    getIsSignedIn(): boolean {
        try {
            const username = atob(localStorage.getItem(AUTH_KEY));
            return username === MOCK_USER.username;
        } catch (e) {
            return false;
        }
    }
}
