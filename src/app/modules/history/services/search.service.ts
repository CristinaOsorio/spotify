import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private readonly URL = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    searchTracks$(term: string): Observable<Tracks[]> {
        return this.httpClient
            .get<Tracks[]>(`${this.URL}/tracks?src=${term}`)
            .pipe(
                map((res: any) => res.data || ([] as Tracks[])),
                map((tracks: Tracks[]) => {
                    return tracks.filter((track: Tracks) => {
                        return (
                            track.name
                                .toLowerCase()
                                .includes(term.toLowerCase()) ||
                            track.album
                                .toLowerCase()
                                .includes(term.toLowerCase()) ||
                            track.artist?.name
                                .toLowerCase()
                                .includes(term.toLowerCase())
                        );
                    });
                }),
                catchError((err: Tracks[]) => {
                    console.log(err);
                    return of([]);
                })
            );
    }
}
