import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

const MOCK_USER = {
    username: 'test',
    password: 'qwerty#555'
};

const AUTH_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    signIn(username, password): Observable<boolean> { // simulates real authentication against server, that's why returns observable
        if (username === MOCK_USER.username && password === MOCK_USER.password) {
            const token = btoa(username); // simulate token that is supposed to be received from server
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
