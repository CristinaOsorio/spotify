import { TrackService } from './../../../tracks/services/track.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
    src: string = '';
    @Output() callbackData: EventEmitter<string> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    callSearch(term: string) {
        this.callbackData.emit(term);
    }
}
