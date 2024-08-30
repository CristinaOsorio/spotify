import { Pipe, PipeTransform } from '@angular/core';
import { Tracks } from './../../core/models/tracks.model';

@Pipe({
    name: 'orderList',
    standalone: true,
})
export class OrderListPipe implements PipeTransform {
    transform(
        value: any[],
        args: string | null = null,
        sort: 'asc' | 'desc' = 'asc'
    ): Tracks[] {
        try {
            if (args === null) {
                return value;
            }

            const orderTrack = value.sort((a, b) => {
                if (a[args] < b[args]) {
                    return -1;
                } else if (a[args] > b[args]) {
                    return 1;
                } else {
                    return 0;
                }
            });

            return sort == 'asc' ? orderTrack : orderTrack.reverse();
        } catch (error) {
            console.log(error);

            return [];
        }
    }
}
