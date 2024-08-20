import { Component, Input } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TimerComponent } from '../../../../shared/shared/features/timer/timer.component';
import { runTicketMatDialogAction, TicketMatDialogAction } from '../../../../shared/shared/util/util';

@Component({
  selector: 'app-ticket-shopping-cart-item',
  standalone: true,
  imports: [
    CustomTabComponent,
    MatButton,
    MatIcon,
    NgIf,
    TimerComponent
  ],
  templateUrl: './ticket-shopping-cart-item.component.html',
  styleUrl: './ticket-shopping-cart-item.component.scss'
})
export class TicketShoppingCartItemComponent {

  @Input()
  public index: number | undefined;

  @Input()
  public ticket: Ticket | undefined;

  constructor(private dialog: MatDialog) {
  }

  protected updateTicket(): void {
    runTicketMatDialogAction(this.dialog, this.ticket, TicketMatDialogAction.UPDATE);
  }

  protected deleteTicket(): void {
    runTicketMatDialogAction(this.dialog, this.ticket, TicketMatDialogAction.DELETE);
  }

  protected downloadTicket(): void {
    if (this.ticket && this.ticket.pdf) {
      window.location.href = this.ticket.pdf;
    }
  }
}
