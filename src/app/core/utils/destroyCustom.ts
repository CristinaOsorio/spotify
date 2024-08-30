import { DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const destroyCustom = () => {
    const subject = new Subject();

    inject(DestroyRef).onDestroy(() => {
        subject.next(true);
        subject.complete();
    });

    return <T>() => takeUntil<T>(subject.asObservable());
};
