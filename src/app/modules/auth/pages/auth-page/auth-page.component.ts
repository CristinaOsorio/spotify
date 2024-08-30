import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
})
export class AuthPageComponent implements OnInit {
    errorSession = false;

    formLogin = new UntypedFormGroup({
        email: new UntypedFormControl('', [Validators.required, Validators.email]),
        password: new UntypedFormControl('', [
            Validators.required,
            Validators.minLength(5),
        ]),
    });

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    sendLogin() {
        if (this.formLogin.valid) {
            const { email, password } = this.formLogin.value;
            this.authService.sendCredencial(email, password).subscribe(
                (res) => {
                    this.router.navigate(['/']);
                    this.errorSession = false;
                    this.formLogin.reset();
                },
                (err) => {
                    this.errorSession = true;
                    console.log('Error sending login');
                }
            );
        }
    }
}
