import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from './../../services/track.service';
import { Tracks } from '../../../../core/models/tracks.model';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrls: ['./tracks-page.component.css'],
    standalone: true,
    imports: [SectionGenericComponent],
})
export class TracksPageComponent implements OnInit, OnDestroy {
    tracksTrending: Tracks[] = [];
    tracksRandom: Tracks[] = [];

    constructor(private trackService: TrackService) {}

    ngOnInit(): void {
        this.loadDataAll();
        this.loadDAtaRandom();
    }

    loadDataAll(): void {
        this.trackService
            .getAllTracks$()
            .subscribe((tracks) => (this.tracksTrending = tracks));
    }

    loadDAtaRandom(): void {
        this.trackService
            .getAllRandom$()
            .subscribe((tracks) => (this.tracksRandom = tracks));
    }

    ngOnDestroy(): void {}
}
