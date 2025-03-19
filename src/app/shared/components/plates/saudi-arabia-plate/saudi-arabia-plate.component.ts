import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-saudi-arabia-plate',
  imports: [],
  templateUrl: './saudi-arabia-plate.component.html',
  styleUrl: './saudi-arabia-plate.component.scss'
})
export class SaudiArabiaPlateComponent {
  @Input() numberAr: string = "";
  @Input() numberEn: string = "";
  @Input() lettersAr: string = "";
  @Input() lettersEn: string = "";

  formatWithSpaces(text: string): string {
    return text.split("").join(" ");
  }
}
