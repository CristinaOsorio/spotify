import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import * as mockRaw from '../../../data/user.json';
import { of } from 'rxjs';

describe('AuthService', () => {
    let service: AuthService;
    let mockUser = (mockRaw as any).default;
    let httpClientSpy: {
        post: jasmine.Spy;
    };
    let cookieService: {
        set: jasmine.Spy;
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        cookieService = jasmine.createSpyObj('CookieService', ['set']);
        service = new AuthService(httpClientSpy as any, cookieService as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a objet with data and tokenSession', (done: DoneFn) => {
        // Arrange
        const userMock = mockUser.userOk;
        const mockResponse = {
            data: {},
            tokenSession: 'token',
        };

        // Assest
        httpClientSpy.post.and.returnValue(of(mockResponse));

        // Act
        service
            .sendCredencial(userMock.email, userMock.password)
            .subscribe((responseApi) => {
                const getProperties = Object.keys(responseApi);
                expect(getProperties).toContain('data');
                expect(getProperties).toContain('tokenSession');
                done();
            });
    });
});
