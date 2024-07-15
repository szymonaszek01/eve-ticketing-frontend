import { Component, Input } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ticket-shopping-cart-item',
  standalone: true,
  imports: [
    CustomTabComponent,
    MatButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './ticket-shopping-cart-item.component.html',
  styleUrl: './ticket-shopping-cart-item.component.scss'
})
export class TicketShoppingCartItemComponent {

  @Input()
  public index: number | undefined;

  @Input()
  public ticket: Ticket | undefined;

  constructor() {
  }
}
