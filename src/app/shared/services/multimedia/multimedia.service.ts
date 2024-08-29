import { Injectable } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
import { BehaviorSubject } from 'rxjs';
const SECONDS_IN_MINUTE = 60;

@Injectable({
    providedIn: 'root',
})
export class MultimediaService {
    public trackInfo$: BehaviorSubject<Tracks | undefined> =
        new BehaviorSubject<Tracks | undefined>(undefined);

    public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
    public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject(
        '-00:00'
    );
    public playerStatus$: BehaviorSubject<string> = new BehaviorSubject(
        'pause'
    );
    public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);
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

    public setAudio(track: Tracks) {
        this.audio.src = track.url;
        this.audio.play();
    }

    public seekAudio(percentage: number) {
        const { duration } = this.audio;
        const percentageToSecond = (percentage / 100) * duration;
        this.audio.currentTime = percentageToSecond;
    }

    public togglePlayer() {
        this.audio.paused ? this.audio.play() : this.audio.pause();
    }

    private listenAllEvents() {
        this.audio.addEventListener('timeupdate', this.calculateTime, false);
        this.audio.addEventListener('playing', this.setPlayingStatus, false);
        this.audio.addEventListener('play', this.setPlayingStatus, false);
        this.audio.addEventListener('pause', this.setPlayingStatus, false);
        this.audio.addEventListener('ended', this.setPlayingStatus, false);
    }

    private calculateTime = () => {
        const { duration, currentTime } = this.audio;
        this.setTimeElapsed(currentTime);
        this.setTimeRemaining(currentTime, duration);
        this.setPercentage(currentTime, duration);
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

    private setTimeRemaining(currentTime: number, duration: number): void {
        let timeLeft = Math.max(0, duration - currentTime);
        const { minutes, seconds } = this.calculateTimeComponents(timeLeft);
        const displayFormat = `-${this.formatTime(minutes, seconds)}`;
        this.timeRemaining$.next(displayFormat);
    }

    private setPlayingStatus = (status: any) => {
        switch (status.type) {
            case 'play':
                this.playerStatus$.next('play');
                break;
            case 'playing':
                this.playerStatus$.next('playing');
                break;
            case 'pause':
                this.playerStatus$.next('pause');
                break;
            case 'ended':
                this.playerStatus$.next('ended');
                break;
            default:
                break;
        }
    };

    private setPercentage(currentTime: number, duration: number) {
        const percentage = (currentTime / duration) * 100;
        this.playerPercentage$.next(percentage);
    }
}
