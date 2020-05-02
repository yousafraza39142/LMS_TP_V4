import {Directive, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';

declare var $: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autoCloseItem]'
})
export class AutoCloseDirective implements OnInit {

  constructor(private elRef: ElementRef) {
  }

  @HostBinding('class.mm-active') isActive = false;

  @HostListener('click') toggleOpen() {
    this.isActive = !this.isActive;
    this.elRef.nativeElement.children[1].classList.toggle('mm-show');
  }

  @HostListener('blur') onBlur() {
    setTimeout(() => {
      this.isActive = false;
      this.elRef.nativeElement.children[1].classList.remove('mm-show');
    }, 100);
  }

  ngOnInit(): void {

  }

}

