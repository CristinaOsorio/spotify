import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Tracks } from './../../../core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TrackService {
    private readonly URL = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAllTracks$(): Observable<Tracks[]> {
        return this.httpClient.get<Tracks[]>(`${this.URL}/tracks`).pipe(
            map((res: any) => res.data),
            catchError((err) => {
                console.log('Error: ', err);
                return of([]);
            })
        );
    }

    getAllRandom$(): Observable<Tracks[]> {
        return this.httpClient.get<Tracks[]>(`${this.URL}/tracks`).pipe(
            map((res: any) => res.data.reverse()),
            catchError((err) => {
                console.log('Error: ', err);
                return of([]);
            })
        );
    }
}
