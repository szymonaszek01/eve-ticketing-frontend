import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    NgOptimizedImage,
    NgTemplateOutlet
  ],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent {

  @Input()
  public image: string | undefined;

  @Input()
  public marginLeft: boolean | undefined;

  @Input()
  public marginRight: boolean | undefined;

  @Input()
  public imgClass: string | undefined;

  @Input()
  public emptyImgClass: string | undefined;
}
