import { MultimediaService } from './../../services/multimedia/multimedia.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tracks } from '../../../core/models/tracks.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit {
    constructor(public multimediaService: MultimediaService) {}

    ngOnInit(): void {}
}
