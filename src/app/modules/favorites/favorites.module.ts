import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';
import { FavoritesRoutingModule } from './favorites-routing.module';


@NgModule({
    imports: [CommonModule, FavoritesRoutingModule, FavoritePageComponent],
})
export class FavoritesModule {}
