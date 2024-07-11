import { Component, Input } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ticket-shopping-cart-item',
  standalone: true,
  imports: [
    CustomTabComponent,
    MatButton,
    MatIcon
  ],
  templateUrl: './ticket-shopping-cart-item.component.html',
  styleUrl: './ticket-shopping-cart-item.component.scss'
})
export class TicketShoppingCartItemComponent {

  @Input()
  protected index: number;

  @Input()
  protected ticket: Ticket;

  constructor() {
    this.index = 1;
    this.ticket = {
      id: 1,
      code: 'fkfjjf1-f123x-ADADD-34as',
      createdAt: new Date(),
      firstname: 'John',
      lastname: 'Kane',
      phoneNumber: '+48791000123',
      cost: 200,
      isAdult: true,
      isStudent: false,
      eventId: 1,
      seatId: 1,
      userId: 1,
      paid: false
    };
  }
}
