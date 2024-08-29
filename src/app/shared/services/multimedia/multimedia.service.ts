import { Injectable } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { BehaviorSubject } from 'rxjs';
const SECONDS_IN_MINUTE = 60;

@Injectable({
    providedIn: 'root',
})
export class MultimediaService {
    public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public timeElapsed$: BehaviorSubject<any> = new BehaviorSubject('00:00');
    public timeRemaining$: BehaviorSubject<any> = new BehaviorSubject('-00:00');
    public audio!: HTMLAudioElement;

    constructor() {
        this.audio = new Audio();
        this.trackInfo$.subscribe((track) => {
            if (track) {
                this.setAudio(track);
                this.listenAllEvents();
            }
        });
    }

    private listenAllEvents() {
        this.audio.addEventListener('timeupdate', this.calculateTime, false);
    }

    private calculateTime = () => {
        const { duration, currentTime } = this.audio;
        this.setTimeElapsed(currentTime);
        this.setTimeRemaining(duration, currentTime);
    };

    private formatTime(minutes: number, seconds: number): string {
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${pad(minutes)}:${pad(seconds)}`;
    }

    private calculateTimeComponents(time: number): {
        minutes: number;
        seconds: number;
    } {
        const seconds = Math.floor(time % SECONDS_IN_MINUTE);
        const minutes = Math.floor(
            (time / SECONDS_IN_MINUTE) % SECONDS_IN_MINUTE
        );
        return { minutes, seconds };
    }

    private setTimeElapsed(currencyTime: number): void {
        const { minutes, seconds } = this.calculateTimeComponents(currencyTime);
        const displayFormat = this.formatTime(minutes, seconds);
        this.timeElapsed$.next(displayFormat);
    }

    private setTimeRemaining(duration: number, currentTime: number): void {
        let timeLeft = Math.max(0, duration - currentTime);
        const { minutes, seconds } = this.calculateTimeComponents(timeLeft);
        const displayFormat = `-${this.formatTime(minutes, seconds)}`;
        this.timeRemaining$.next(displayFormat);
    }

    public setAudio(track: Tracks) {
        this.audio.src = track.url;
        // this.audio.load();
        this.audio.play();
    }
}
