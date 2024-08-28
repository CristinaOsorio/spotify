import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from './../../services/track.service';
import { Tracks } from '../../../../core/models/tracks.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit, OnDestroy {
    tracksTrending: Tracks[] = [];
    tracksRandom: Tracks[] = [];

    listObservable: Subscription[] = [];

    constructor(private trackService: TrackService) {}

    ngOnInit(): void {
        const dataTracksTrending$ =
            this.trackService.dataTracksTrending$.subscribe((tracks) => {
                this.tracksTrending = tracks;
                this.tracksRandom = tracks;
            });

        const dataTracksRandom$ = this.trackService.dataTracksRandom$.subscribe(
            (tracks) => {
                this.tracksRandom = [...tracks, ...this.tracksRandom];
            }
        );

        this.listObservable = [dataTracksTrending$, dataTracksRandom$];
    }

    ngOnDestroy(): void {
        this.listObservable.forEach((sub) => sub.unsubscribe());
    }
}
