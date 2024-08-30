import { Component, Input, OnInit } from '@angular/core';
import { Tracks } from '../../../core/models/tracks.model';
import { OrderListPipe } from '../../pipes/order-list.pipe';
import { ImgBrokenDirective } from '../../directives/img-broken/img-broken.directive';
import { NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-play-list-body',
    templateUrl: './play-list-body.component.html',
    styleUrls: ['./play-list-body.component.css'],
    standalone: true,
    imports: [
        NgFor,
        NgTemplateOutlet,
        ImgBrokenDirective,
        OrderListPipe,
    ],
})
export class PlayListBodyComponent implements OnInit {
    @Input() tracks: Array<Tracks> = [];
    orderOption: {
        property: 'name' | 'album' | null;
        order: 'asc' | 'desc';
    } = {
        property: null,
        order: 'asc',
    };

    constructor() {}

    ngOnInit(): void {}

    changeSort(property: 'name' | 'album' | null): void {
        const { order } = this.orderOption;

        this.orderOption = {
            property,
            order: order == 'asc' ? 'desc' : 'asc',
        };
    }
}
