import { MultimediaService } from './../../services/multimedia/multimedia.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tracks } from '../../../core/models/tracks.model';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    state: string = 'pause';

    constructor(public multimediaService: MultimediaService) {}

    ngOnInit(): void {
        this.multimediaService.playerStatus$
            .pipe(takeUntil(this.destroy$))
            .subscribe((state) => (this.state = state));
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
