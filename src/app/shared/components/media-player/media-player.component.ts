import { MultimediaService } from './../../services/multimedia/multimedia.service';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
    @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
    private destroy$: Subject<boolean> = new Subject<boolean>();
    state: string = 'pause';

    constructor(public multimediaService: MultimediaService) {}

    ngOnInit(): void {
        this.multimediaService.playerStatus$
            .pipe(takeUntil(this.destroy$))
            .subscribe((state) => (this.state = state));
    }

    handlePosition(event: MouseEvent) {
        const elNative: HTMLElement = this.progressBar.nativeElement;
        const { clientX } = event;
        const { x, width } = elNative.getBoundingClientRect();
        const clickX = clientX - x;
        const percentageFromX = (clickX / width) * 100;

        this.multimediaService.seekAudio(percentageFromX);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
