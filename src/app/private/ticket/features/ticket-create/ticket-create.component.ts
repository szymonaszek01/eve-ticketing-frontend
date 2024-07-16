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
import { renderApiError, renderError } from '../../../../shared/shared/util/util';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgForOf, NgIf } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { selectError } from '../../data-access/ticket-reducers';
import { MatIcon } from '@angular/material/icon';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Event,
              private dialogRef: MatDialogRef<TicketCreateComponent>,
              private formBuilder: FormBuilder,
              private ticketStore: Store<{ ticket: TicketState }>,
              private authStore: Store<{ auth: AuthState }>,
  ) {
    this.event = data;
    this.formGroup = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      isAdult: [false, Validators.required],
      isStudent: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.ticketStore.select(selectError).subscribe(apiError => {
      if (this.formGroup.valid && !apiError) {
        this.dialogRef.close();
      }
      this.apiError = apiError;
    });
    this.authStore.select(selectAuth).subscribe(auth => this.user = auth);
  }

  protected error(key: string | undefined): string {
    return key ? renderError(this.formGroup.controls[key], key) : renderApiError(this.apiError);
  }

  protected onInput(): void {
    if (this.apiError) {
      this.ticketStore.dispatch(ticketActions.loadError({error: undefined}));
    }
  }

  protected onSubmit(): void {
    if (!this.formGroup.valid || !this.event || !this.user) {
      return;
    }
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
