import { Component, Input, OnInit } from '@angular/core';
import { Tracks } from '../../../core/models/tracks.model';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css'],
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

  constructor() {}

  ngOnInit(): void {}
}
