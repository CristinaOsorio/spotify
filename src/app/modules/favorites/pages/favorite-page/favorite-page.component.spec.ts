import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePageComponent } from './favorite-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoritePageComponent', () => {
    let component: FavoritePageComponent;
    let fixture: ComponentFixture<FavoritePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, FavoritePageComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FavoritePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
