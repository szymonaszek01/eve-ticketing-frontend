import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-tab',
  standalone: true,
  imports: [],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss'
})
export class CustomTabComponent {

  @Input()
  public label: string;

  @Input()
  public value: string;

  constructor() {
    this.label = '';
    this.value = '';
  }
}
