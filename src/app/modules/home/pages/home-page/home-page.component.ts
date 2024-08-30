import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MediaPlayerComponent } from '../../../../shared/components/media-player/media-player.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    standalone: true,
    imports: [SidebarComponent, MediaPlayerComponent, RouterOutlet]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
