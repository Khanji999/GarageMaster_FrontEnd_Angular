import { Component } from '@angular/core';
import { ImageBackgroundComponent } from "../../components/image-background/image-background.component";
import { IMAGE_PATHS } from '../../../core/services/imagesPath/images-path.service';

@Component({
  selector: 'app-home',
  imports: [ImageBackgroundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  imagePaths = IMAGE_PATHS;

}
