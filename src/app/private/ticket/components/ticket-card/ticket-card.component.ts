import { Component, Input } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [
    CustomTabComponent,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatChip,
    NgIf
  ],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent {

  @Input()
  public ticket: Ticket | undefined;

  @Input()
  public index: number | undefined;

  constructor() {
  }
}
