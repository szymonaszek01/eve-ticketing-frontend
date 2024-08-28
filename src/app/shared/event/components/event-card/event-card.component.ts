import { Event } from '../../models/event';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomTabComponent } from '../../../shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { ImageViewerComponent } from '../../../shared/components/image-viewer/image-viewer.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatChip, CustomTabComponent, MatButton, ImageViewerComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {

  @Input()
  public event: Event | undefined;

  @Output() buyTicket = new EventEmitter<Event>();

  constructor() {
  }

  protected onClick(): void {
    this.buyTicket.emit(this.event);
  }
}
