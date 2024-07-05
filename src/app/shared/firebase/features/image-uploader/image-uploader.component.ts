import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {

  @Input()
  public action: ((file: File) => void) | undefined;

  @Input()
  public store: any;

  protected onClick(event: any): void {
    const file: File = event.target.files[0];
    console.log(file);
    if (this.action) {
      this.action(file);
    }
  }
}
