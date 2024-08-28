import { MultimediaService } from './../../services/multimedia/multimedia.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tracks } from '../../../core/models/tracks.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
    callback$!: Subscription;

    mockCover: Tracks = {
        cover: 'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
        name: 'Name del artista',
        album: 'Tema del album',
        url: 'url',
        _id: 1,
    };

    constructor(private multimediaService: MultimediaService) {}

    ngOnInit(): void {
        this.callback$ = this.multimediaService.callback.subscribe(
            (response) => {
                this.mockCover = response;
            }
        );
    }

    ngOnDestroy(): void {
        this.callback$.unsubscribe();
    }
}
