import { MultimediaService } from './../../services/multimedia/multimedia.service';
import { Component, inject, Input } from '@angular/core';
import { Tracks } from '../../../core/models/tracks.model';
import { ImgBrokenDirective } from '../../directives/img-broken/img-broken.directive';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-card-player',
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.css'],
    standalone: true,
    imports: [NgIf, ImgBrokenDirective, NgClass],
})
export class CardPlayerComponent {
    @Input({ required: true }) mode: 'small' | 'big' = 'small';
    @Input({ required: true }) track: Tracks = {
        name: '',
        album: '',
        cover: '',
        url: '',
        _id: '',
    };

    private multimediaService = inject(MultimediaService);

    sendPlay(track: Tracks) {
        this.multimediaService.trackInfoSignal.set(track);
    }
}
