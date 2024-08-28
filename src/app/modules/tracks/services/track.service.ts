import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Tracks } from './../../../core/models/tracks.model';
import * as dataRaw from './../../../data/tracks.json';

@Injectable({
    providedIn: 'root',
})
export class TrackService {
    dataTracksTrending$: Observable<Tracks[]> = of([]);
    dataTracksRandom$: Observable<Tracks[]> = of([]);

    constructor() {
        const { data }: any = (dataRaw as any).default;
        this.dataTracksTrending$ = of(data);

        this.dataTracksRandom$ = new Observable<Tracks[]>((observe) => {
            const trackExample: Tracks[] = [
                {
                    name: 'Random Track',
                    album: 'Random Album',
                    cover: 'https://via.placeholder.com/150',
                    url: 'https://www.example.com/track',
                    _id: Math.random(),
                    artist: {
                        name: 'Random Artist',
                        nickname: 'Random Artist',
                        nationality: 'Nationality',
                    },
                },
            ];
            observe.next(trackExample);
        });
    }
}
