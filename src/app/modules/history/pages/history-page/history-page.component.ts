import { SearchService } from './../../services/search.service';
import { TrackService } from './../../../tracks/services/track.service';
import { Component, OnInit } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
    listResults$: Observable<Tracks[]> = of([]);

    constructor(private searchService: SearchService) {}

    ngOnInit(): void {}

    receiveData(term: string) {
        this.listResults$ = this.searchService.searchTracks$(term);
    }
}
