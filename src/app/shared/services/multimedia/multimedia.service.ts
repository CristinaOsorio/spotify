import { effect, Injectable, signal } from '@angular/core';
import { Tracks } from '@core/models/tracks.model';
const SECONDS_IN_MINUTE = 60;

@Injectable({
    providedIn: 'root',
})
export class MultimediaService {
    public audio!: HTMLAudioElement;

    trackInfoSignal = signal<Tracks | undefined>(undefined);
    timeElapsedSignal = signal<string>('00:00');
    timeRemainingSignal = signal<string>('-00:00');
    playerStatusSignal = signal<string>('pause');
    playerPercentageSignal = signal<number>(0);

    constructor() {
        this.audio = new Audio();
        effect(() => {
            const dataInfo = this.trackInfoSignal();
            if (dataInfo) {
                this.setAudio(dataInfo);
            }
        });
    }

    public setAudio(track: Tracks) {
        this.audio.src = track.url;
        this.audio.play();
        this.listenAllEvents();
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
        this.timeElapsedSignal.set(displayFormat);
    }

    private setTimeRemaining(currentTime: number, duration: number): void {
        let timeLeft = Math.max(0, duration - currentTime);
        const { minutes, seconds } = this.calculateTimeComponents(timeLeft);
        const displayFormat = `-${this.formatTime(minutes, seconds)}`;
        this.timeRemainingSignal.set(displayFormat);
    }

    private setPlayingStatus = (status: any) => {
        switch (status.type) {
            case 'play':
                this.playerStatusSignal.set('play');
                break;
            case 'playing':
                this.playerStatusSignal.set('playing');
                break;
            case 'pause':
                this.playerStatusSignal.set('pause');
                break;
            case 'ended':
                this.playerStatusSignal.set('ended');
                break;
            default:
                break;
        }
    };

    private setPercentage(currentTime: number, duration: number) {
        const percentage = (currentTime / duration) * 100;
        this.playerPercentageSignal.set(percentage);
    }
}
