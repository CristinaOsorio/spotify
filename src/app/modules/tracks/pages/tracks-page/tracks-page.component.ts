import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json';
import { Tracks } from '../../../../core/models/tracks.model';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit {
  mockTracksList: Array<Tracks> = [];
  constructor() {}

  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default;
    this.mockTracksList = data;
  }
}
