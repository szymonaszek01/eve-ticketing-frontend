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
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketCreateComponent } from '../../features/ticket-create/ticket-create.component';
import { TicketDeleteComponent } from '../../features/ticket-delete/ticket-delete.component';

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
    NgIf,
    MatIcon
  ],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent {

  @Input()
  public ticket: Ticket | undefined;

  @Input()
  public index: number | undefined;

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

  protected downloadTicket(): void {
    if (this.ticket && this.ticket.pdf) {
      window.location.href = this.ticket.pdf;
    }
  }
}
