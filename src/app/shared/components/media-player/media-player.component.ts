import {
    Component,
    effect,
    ElementRef,
    inject,
    ViewChild,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { ImgBrokenDirective } from '../../directives/img-broken/img-broken.directive';
import { MultimediaService } from './../../services/multimedia/multimedia.service';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, ImgBrokenDirective, NgClass, AsyncPipe],
})
export class MediaPlayerComponent {
    @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');

    state: string = 'pause';

    multimediaService = inject(MultimediaService);

    constructor() {
        effect(() => {
            const state = this.multimediaService.playerStatusSignal();
            this.state = state;
        });
    }

    handlePosition(event: MouseEvent) {
        const elNative: HTMLElement = this.progressBar.nativeElement;
        const { clientX } = event;
        const { x, width } = elNative.getBoundingClientRect();
        const clickX = clientX - x;
        const percentageFromX = (clickX / width) * 100;

        this.multimediaService.seekAudio(percentageFromX);
    }
}
