import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
} from '@angular/core';

@Directive({
    selector: 'img[appImgBroken]',
})
export class ImgBrokenDirective {
    @Input('defaultImage') defaultImage: string = '';

    constructor(private elHost: ElementRef) {}
    @HostListener('error') handleError() {
        const elNative = this.elHost.nativeElement;

        elNative.src =
            this.defaultImage || '../../../../assets/images/music.jpg';
    }
}
