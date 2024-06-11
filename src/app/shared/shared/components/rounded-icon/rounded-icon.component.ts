import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rounded-icon',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './rounded-icon.component.html',
  styleUrl: './rounded-icon.component.scss'
})
export class RoundedIconComponent {

  @Input()
  public iconName: string;

  @Input()
  public link: string;

  constructor() {
    this.iconName = '';
    this.link = 'http://localhost:4200';
  }
}
