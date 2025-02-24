import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-image-background',
  imports: [],
  templateUrl: './image-background.component.html',
  styleUrl: './image-background.component.scss'
})
export class ImageBackgroundComponent {
  @Input() largeImage: string = '';  // Image for large screens
  @Input() smallImage: string = '';  // Image for small screens

  screenWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  getResponsiveImage(): string {
    return this.screenWidth < 700 ? this.smallImage : this.largeImage;
  }
}
