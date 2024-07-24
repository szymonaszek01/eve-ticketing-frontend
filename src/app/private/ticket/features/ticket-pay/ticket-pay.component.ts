import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { Store } from '@ngrx/store';
import { TicketState } from '../../models/ticket-state';
import { selectError, selectReservedList } from '../../data-access/ticket-reducers';
import { ticketActions } from '../../data-access/ticket-actions';
import { renderApiError, ticketReservedFilter } from '../../../../shared/shared/util/util';
import { User } from '../../../../shared/shared/models/user';
import { AuthState } from '../../../../public/auth/models/auth-state';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';

@Component({
  selector: 'app-ticket-pay',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatIcon,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './ticket-pay.component.html',
  styleUrl: './ticket-pay.component.scss'
})
export class TicketPayComponent {

  protected ticketReservedList: Ticket[];

  protected apiError: ApiError | undefined;

  private user: User | undefined;

  constructor(private dialogRef: MatDialogRef<TicketPayComponent>,
              private ticketStore: Store<{ ticket: TicketState }>,
              private authStore: Store<{ auth: AuthState }>
  ) {
    this.ticketReservedList = [];
  }

  ngOnInit(): void {
    this.authStore.select(selectAuth).subscribe(auth => this.user = auth);
    this.ticketStore.select(selectReservedList).subscribe((reservedList) => {
      if (reservedList.length < 1) {
        this.dialogRef.close();
      }
      this.ticketReservedList = reservedList;
    });
    this.ticketStore.select(selectError).subscribe(apiError => {
      this.apiError = apiError;
      if (this.user) {
        this.ticketStore.dispatch(ticketActions.loadReserved({
          page: 0,
          size: 5,
          filter: ticketReservedFilter(this.user.id),
          sort: undefined
        }));
      }
    });
  }

  protected error(): string {
    return renderApiError(this.apiError);
  }

  protected onSubmit(): void {
    if (this.ticketReservedList.length < 1) {
      return;
    }
    this.ticketStore.dispatch(ticketActions.pay({values: {ids: this.ticketReservedList.map(ticket => ticket.id)}}));
  }
}
