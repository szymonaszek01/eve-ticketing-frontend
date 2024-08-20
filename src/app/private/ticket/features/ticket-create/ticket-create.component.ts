import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Event } from '../../../../shared/event/models/event';
import { ticketActions } from '../../data-access/ticket-actions';
import { Store } from '@ngrx/store';
import { TicketState } from '../../models/ticket-state';
import { AuthState } from '../../../../public/auth/models/auth-state';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';
import { User } from '../../../../shared/shared/models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { renderApiError, renderError, ticketReservedFilter } from '../../../../shared/shared/util/util';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgForOf, NgIf } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { selectError, selectLastAdded, selectLastUpdated } from '../../data-access/ticket-reducers';
import { MatIcon } from '@angular/material/icon';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgForOf,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatIcon,
    NgIf
  ],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss'
})
export class TicketCreateComponent {

  protected apiError: ApiError | undefined;

  protected formGroup: FormGroup;

  protected event: Event | undefined;

  private user: User | undefined;

  private readonly ticket: Ticket | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<TicketCreateComponent>,
              private formBuilder: FormBuilder,
              private ticketStore: Store<{ ticket: TicketState }>,
              private authStore: Store<{ auth: AuthState }>,
  ) {
    if ('event' in data) {
      this.event = data.event;
    }
    if ('ticket' in data) {
      this.ticket = data.ticket;
      this.event = data.ticket.event;
    }
    this.formGroup = this.formBuilder.group({
      firstname: [this.ticket ? this.ticket.firstname : '', this.ticket ? [] : [Validators.required]],
      lastname: [this.ticket ? this.ticket?.lastname : '', this.ticket ? [] : [Validators.required]],
      phoneNumber: [this.ticket ? this.ticket?.phoneNumber : '', this.ticket ? [] : [Validators.required]],
      isAdult: [this.ticket ? this.ticket?.isAdult ? 'true' : 'false' : '', this.ticket ? [] : [Validators.required]],
      isStudent: [this.ticket ? this.ticket?.isStudent ? 'true' : 'false' : '', this.ticket ? [] : [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ticketStore.select(selectLastAdded).subscribe(ticket => {
      if (this.user && ticket) {
        this.ticketStore.dispatch(ticketActions.loadReserved({
          page: 0,
          size: 5,
          filter: ticketReservedFilter(this.user.id),
          sort: undefined
        }));
        this.dialogRef.close();
      }
    });
    this.ticketStore.select(selectLastUpdated).subscribe(ticket => {
      if (this.user && ticket) {
        if (!ticket.paid) {
          this.ticketStore.dispatch(ticketActions.loadReserved({
            page: 0,
            size: 5,
            filter: ticketReservedFilter(this.user.id),
            sort: undefined
          }));
        }
        this.dialogRef.close();
      }
    });
    this.ticketStore.select(selectError).subscribe(apiError => this.apiError = apiError);
    this.authStore.select(selectAuth).subscribe(auth => this.user = auth);
  }

  protected error(key: string | undefined): string {
    return key ? renderError(this.formGroup.controls[key], key) : renderApiError(this.apiError);
  }

  protected onSubmit(): void {
    if (!this.formGroup.valid || !this.event || !this.user) {
      return;
    }
    if (this.apiError) {
      this.ticketStore.dispatch(ticketActions.loadError({error: undefined}));
    }
    if (this.ticket) {
      const body: any = {id: this.ticket.id};
      for (const key in this.formGroup.value) {
        if (this.formGroup.value.hasOwnProperty(key) && this.formGroup.value[key]) {
          body[key] = (key === 'isAdult' || key === 'isStudent') ? this.formGroup.value[key] === 'true' : this.formGroup.value[key];
        }
      }
      this.ticketStore.dispatch(ticketActions.update({values: body}));
    } else {
      this.ticketStore.dispatch(ticketActions.add({
        ticketReq: {
          ...this.formGroup.value,
          isAdult: this.formGroup.value.isAdult === 'true',
          isStudent: this.formGroup.value.isStudent === 'true',
          eventId: this.event.id,
          userId: this.user.id
        }
      }));
    }
  }
}
