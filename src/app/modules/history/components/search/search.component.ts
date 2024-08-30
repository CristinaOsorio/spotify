import { TrackService } from './../../../tracks/services/track.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { map } from 'rxjs/operators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule],
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
