import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
    let component: AuthPageComponent;
    let fixture: ComponentFixture<AuthPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule, AuthPageComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return invalid form', () => {
        // Arrange
        const mockCredential = {
            email: 'invalid_email',
            password: '',
        };
        const emailForm: any = component.formLogin.get('email');
        const passwordForm: any = component.formLogin.get('password');

        // Assert
        emailForm.setValue(mockCredential.email);
        passwordForm.setValue(mockCredential.password);

        //Act
        expect(component.formLogin.invalid).toBeTruthy();
    });

    it('should return valid form', () => {
        // Arrange
        const mockCredential = {
            email: 'test@test.com',
            password: '12345678',
        };
        const emailForm: any = component.formLogin.get('email');
        const passwordForm: any = component.formLogin.get('password');

        // Assert
        emailForm.setValue(mockCredential.email);
        passwordForm.setValue(mockCredential.password);

        //Act
        expect(component.formLogin.valid).toBeTruthy();
    });

    it('should show the text "Iniciar sesión" in button', () => {
        // Arrange
        const text = 'Iniciar sesión';
        const elementRef = fixture.debugElement.query(
            By.css('.form-action button')
        );
        const getInnerText = elementRef.nativeElement.innerText;

        // Act
        expect(getInnerText).toEqual(text);
    });
});
