import { Pipe, PipeTransform } from '@angular/core';
import { TracksModule } from '../../modules/tracks/tracks.module';

@Pipe({
  name: 'orderList',
})
export class OrderListPipe implements PipeTransform {
  transform(value: TracksModule[]): Array<any> {
    return value;
  }
}
