import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../data/tracks.json';
import { Tracks } from '../../../core/models/tracks.model';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css'],
})
export class PlayListBodyComponent implements OnInit {
  tracks: Array<Tracks> = [];
  constructor() {}

  ngOnInit(): void {
    const { data } = (dataRaw as any).default;
    this.tracks = data;
  }
}
