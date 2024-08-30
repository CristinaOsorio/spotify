import { MultimediaService } from './../../services/multimedia/multimedia.service';
import { Component, Input, OnInit } from '@angular/core';
import { Tracks } from '../../../core/models/tracks.model';
import { ImgBrokenDirective } from '../../directives/img-broken/img-broken.directive';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-card-player',
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.css'],
    standalone: true,
    imports: [
        NgIf,
        ImgBrokenDirective,
        NgClass,
    ],
})
export class CardPlayerComponent implements OnInit {
    @Input() mode: 'small' | 'big' = 'small';
    @Input() track: Tracks = {
        name: '',
        album: '',
        cover: '',
        url: '',
        _id: '',
    };

    constructor(private multimediaService: MultimediaService) {}

    ngOnInit(): void {}

    sendPlay(track: Tracks) {
        this.multimediaService.trackInfo$.next(track);
    }
}
