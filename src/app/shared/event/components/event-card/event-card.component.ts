import { Event } from '../../models/event';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomTabComponent } from '../../../shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

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

  @Input()
  public onClick: (event: Event, router: Router) => void;

  constructor(protected router: Router) {
    this.event = {} as Event;
    this.onClick = (event: Event, router: Router) => console.log(event, router);
  }
}
