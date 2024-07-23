import { Component, Input } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketCreateComponent } from '../../features/ticket-create/ticket-create.component';
import { TimerComponent } from '../../../../shared/shared/features/timer/timer.component';
import { TicketDeleteComponent } from '../../features/ticket-delete/ticket-delete.component';

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
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.maxWidth = '25rem';
    dialogConfig.data = {ticket: this.ticket};
    this.dialog.open(TicketCreateComponent, dialogConfig);
  }

  protected deleteTicket(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.maxWidth = '25rem';
    dialogConfig.data = {ticket: this.ticket};
    this.dialog.open(TicketDeleteComponent, dialogConfig);
  }
}
