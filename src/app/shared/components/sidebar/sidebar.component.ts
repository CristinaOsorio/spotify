import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    standalone: true,
    imports: [
        NgFor,
        RouterLinkActive,
        RouterLink,
        NgClass,
    ],
})
export class SidebarComponent implements OnInit {
  mainMenu: {
    defaultOptions: Array<any>;
    accessLink: Array<any>;
  } = {
    defaultOptions: [],
    accessLink: [],
  };

  customOptions: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      { name: 'Home', icon: 'uil uil-estate', router: ['/'] },
      { name: 'Buscar', icon: 'uil uil-search', router: ['/', 'history'] },
      {
        name: 'Tu Biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
      },
    ];
    this.mainMenu.accessLink = [
      { name: 'Crear Lista', icon: 'uil-square' },
      { name: 'Canciones que te gustan', icon: 'uil-heart-medical' },
    ];
    this.customOptions = [
      { name: 'Mi lista N° 1', router: ['/'] },
      { name: 'Mi lista N° 2', router: ['/'] },
      { name: 'Mi lista N° 3', router: ['/'] },
      { name: 'Mi lista N° 4', router: ['/'] },
    ];
  }
}
