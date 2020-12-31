import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const path = state.url;
        const isSignedIn = this.authService.getIsSignedIn();
        if (isSignedIn && path === '/login') {
            this.router.navigateByUrl('/board');
        }
        if (!isSignedIn && path === '/board') {
            this.router.navigateByUrl('/login');
        }
        return true;
    }
}
