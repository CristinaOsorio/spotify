import { Component, OnInit } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';
import { PlayListHeaderComponent } from '../../../../shared/components/play-list-header/play-list-header.component';

@Component({
    selector: 'app-favorite-page',
    templateUrl: './favorite-page.component.html',
    styleUrls: ['./favorite-page.component.css'],
    standalone: true,
    imports: [
        PlayListHeaderComponent,
        PlayListBodyComponent,
        AsyncPipe,
    ],
})
export class FavoritePageComponent implements OnInit {
    tracks$!: Observable<Tracks[]>;
    constructor(private trackService: TrackService) {}

    ngOnInit(): void {
        this.tracks$ = this.trackService.getAllRandom$();
    }
}
