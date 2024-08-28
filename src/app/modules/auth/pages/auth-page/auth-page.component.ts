import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
    formLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
        ]),
    });

    constructor() {}

    ngOnInit(): void {}

    sendLogin() {
        console.log(this.formLogin.value);
        this.formLogin.reset();
    }
}
