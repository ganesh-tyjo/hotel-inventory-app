// Custom Directive - directives are similar to component but they don't have template

import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true,
})
export class HoverDirective {
  @Input() appHover: string = 'red';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    //this.element.nativeElement.style.backgroundColor = this.color;
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.appHover
    );
  }

  // Listens to any event happening of element using this directive
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    );
  }
}
