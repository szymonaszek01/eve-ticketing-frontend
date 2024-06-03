import { Event } from '../../models/Event';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomTabComponent } from '../custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatChip, CustomTabComponent, MatButton],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {

  @Input()
  public event: Event;

  public chipList: string[];

  constructor() {
    this.event = {} as Event;
    this.chipList = [
      this.event.country,
      this.event.address
    ].concat(this.event.localizationName ? [this.event.localizationName] : [])
      .concat([this.event.country + this.event.currency]);
  }
}
