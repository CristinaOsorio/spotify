import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Auth } from '../models/auth.interface';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly URL = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService
    ) {}

    sendCredencial(email: string, password: string) {
        const body = {
            email,
            password,
        };
        return this.httpClient
            .post<Auth>(`${this.URL}/auth/login`, body)
            .pipe(
                tap((res) =>
                    this.cookieService.set('token', res.tokenSession, 4, '/')
                )
            );
    }
}
