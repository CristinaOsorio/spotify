import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json';
import { Tracks } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
    it('create an instance', () => {
        const pipe = new OrderListPipe();
        expect(pipe).toBeTruthy();
    });

    it('should test the input and output of values', () => {
        const pipe = new OrderListPipe();
        const { data } = (mockRaw as any).default;

        const result: Tracks[] = pipe.transform(data);

        expect(result).toEqual(data);
    });

    it('should return data ascendent', () => {
        const pipe = new OrderListPipe();
        const { data } = (mockRaw as any).default;
        const firstValue = data.find((i: any) => i._id === 7);
        const lastValue = data.find((i: any) => i._id === 6);

        const result: Tracks[] = pipe.transform(data, 'name');
        const firstResult = result.find((i: any) => i._id === 7);
        const lastResult = result.find((i: any) => i._id === 6);

        expect(firstValue).toEqual(firstResult);
        expect(lastValue).toEqual(lastResult);
    });

    it('should return data descendent', () => {
        const pipe = new OrderListPipe();
        const { data } = (mockRaw as any).default;
        const firstValue = data.find((i: any) => i._id === 6);
        const lastValue = data.find((i: any) => i._id === 7);

        const result: Tracks[] = pipe.transform(data, 'name', 'desc');
        const firstResult = result.find((i: any) => i._id === 6);
        const lastResult = result.find((i: any) => i._id === 7);

        expect(firstValue).toEqual(firstResult);
        expect(lastValue).toEqual(lastResult);
    });
});
