import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    sendCredencial(email: string, password: string) {
        // Simulando la autenticación
        console.log(`Autenticando ${email} con la contraseña ${password}`);
        return true; // Simulación exitosa de autenticación
    }
}
