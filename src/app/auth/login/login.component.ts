import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

    signInForm: FormGroup;
    private componentDestroy$ = new Subject();

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.signInForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        const { username, password } = this.signInForm.getRawValue();
        this.authService.signIn(username, password)
            .pipe(
                takeUntil(this.componentDestroy$),
                catchError((err) => {
                    this.signInForm.setErrors({
                        invalidCred: true
                    });
                    return of(false);
                }),
                filter(res => !!res)
            )
            .subscribe((_) => {
                this.router.navigateByUrl('/board');
            });
    }

    ngOnDestroy(): void {
        this.componentDestroy$.next();
        this.componentDestroy$.unsubscribe();
    }

}
