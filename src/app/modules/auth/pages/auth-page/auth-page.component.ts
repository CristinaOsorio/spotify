import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
    errorSession = false;

    formLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
        ]),
    });

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    sendLogin() {
        console.log(this.formLogin.value);
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
