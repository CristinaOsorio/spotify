import { Component, OnInit } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-favorite-page',
    templateUrl: './favorite-page.component.html',
    styleUrls: ['./favorite-page.component.css'],
})
export class FavoritePageComponent implements OnInit {
    tracks$!: Observable<Tracks[]>;
    constructor(private trackService: TrackService) {}

    ngOnInit(): void {
        this.tracks$ = this.trackService.getAllRandom$();
    }
}
