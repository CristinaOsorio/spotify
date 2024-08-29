import { EventEmitter, Injectable } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MultimediaService {
    callback: EventEmitter<any> = new EventEmitter();

    public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public audio!: HTMLAudioElement;

    constructor() {
        this.audio = new Audio();
        this.trackInfo$.subscribe((track) => {
            console.log(track);
            if (track) {
                this.setAudio(track);
            }
        });
    }
    public setAudio(track: Tracks) {
        this.audio.src = track.url;
        this.audio.load();
        this.audio.play();
    }
}
