import { Routes } from '@angular/router';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';

export const favoritesRoutes: Routes = [
    { path: '', component: FavoritePageComponent, outlet: 'child' },
];
