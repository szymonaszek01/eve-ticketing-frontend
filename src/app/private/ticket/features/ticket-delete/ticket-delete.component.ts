import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { renderApiError, ticketReservedFilter } from '../../../../shared/shared/util/util';
import { Store } from '@ngrx/store';
import { TicketState } from '../../models/ticket-state';
import { selectError, selectLastRemoved } from '../../data-access/ticket-reducers';
import { ticketActions } from '../../data-access/ticket-actions';

@Component({
  selector: 'app-ticket-delete',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './ticket-delete.component.html',
  styleUrl: './ticket-delete.component.scss'
})
export class TicketDeleteComponent {

  protected ticket: Ticket | undefined;

  protected apiError: ApiError | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<TicketDeleteComponent>,
              private ticketStore: Store<{ ticket: TicketState }>
  ) {
    if (data.hasOwnProperty('ticket')) {
      this.ticket = data.ticket;
    }
  }

  ngOnInit(): void {
    this.ticketStore.select(selectLastRemoved).subscribe((ticket) => {
      if (!ticket) {
        return;
      }
      if (ticket.id !== this.ticket?.id) {
        return;
      }
      if (!ticket.paid) {
        this.ticketStore.dispatch(ticketActions.loadReserved({
          page: 0,
          size: 5,
          filter: ticketReservedFilter(ticket.userId),
          sort: undefined
        }));
      }
      this.dialogRef.close();
    });
    this.ticketStore.select(selectError).subscribe(apiError => this.apiError = apiError);
  }

  protected error(): string {
    return renderApiError(this.apiError);
  }

  protected onSubmit(): void {
    if (!this.ticket) {
      return;
    }
    this.ticketStore.dispatch(ticketActions.remove({ticket: this.ticket}));
  }
}
