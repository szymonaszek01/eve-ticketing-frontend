import { AbstractControl } from '@angular/forms';
import { ApiError } from '../models/api-error';
import { TicketFilter } from '../../../private/ticket/models/ticket-filter';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketCreateComponent } from '../../../private/ticket/features/ticket-create/ticket-create.component';
import { TicketDeleteComponent } from '../../../private/ticket/features/ticket-delete/ticket-delete.component';

export function renderError(formControl: AbstractControl, key: string): string {
  if (formControl.hasError('required')) {
    return `Field ${capitalize(space(key))} is required`;
  }
  if (formControl.hasError('email')) {
    return `Invalid email structure`;
  }
  if (formControl.hasError('pattern')) {
    return `Password should be at least 8 characters long, contain at least one digit, one uppercase letter, one lowercase letter and one special character`;
  }
  if (formControl.hasError('incorrectRepeatedPassword')) {
    return `Password is not equaled repeated password`;
  }
  return '';
}

export function renderApiError(apiError: ApiError | undefined): string {
  return apiError?.errors?.map(error => error.description).join(', ') ?? 'An error occurred';
}

export function capitalize(value: string): string {
  return value[0].toUpperCase() + value.substring(1).toLowerCase();
}

export function space(key: string): string {
  return key.replace(/[A-Z-_\\&](?=[a-z0-9]+)|[A-Z-_\\&]+(?![a-z0-9])/g, ' $&').trim();
}

export function setInLocalStorage<T>(state: T | undefined, key: string): void {
  if (state) {
    localStorage.setItem(key, JSON.stringify(state));
  }
}

export function getFromLocalStorage<T>(key: string, dateKeyList: string[]): T | undefined {
  const stateAsString: string | null = localStorage.getItem(key);
  let state: any | undefined = stateAsString ? JSON.parse(stateAsString) : undefined;
  if (state) {
    dateKeyList.forEach(dateKey => state = {...state, [dateKey]: new Date(state[dateKey])});
    return state as T;
  }
  return undefined;
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export const paymentTimeInMillis: number = 1000 * 60 * 10;

export function ticketReservedFilter(userId: number): TicketFilter {
  return {
    code: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    minCost: '',
    maxCost: '',
    minDate: new Date(Math.floor(new Date().getTime() / paymentTimeInMillis) * paymentTimeInMillis).toISOString(),
    maxDate: '',
    eventId: 0,
    userId,
    seatId: 0,
    paid: false
  };
}

export function ticketListFilter(userId: number): TicketFilter {
  return {
    code: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    minCost: '',
    maxCost: '',
    minDate: '',
    maxDate: '',
    eventId: 0,
    userId,
    seatId: 0,
    paid: true
  };
}

export enum TicketMatDialogAction {
  CREATE,
  UPDATE,
  DELETE
}

export function runTicketMatDialogAction(dialog: MatDialog, data: any, action: TicketMatDialogAction): void {
  const dialogConfig: MatDialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '100%';
  dialogConfig.maxWidth = '25rem';
  dialogConfig.data = {[action !== TicketMatDialogAction.CREATE ? 'ticket' : 'event']: data};
  if (action !== TicketMatDialogAction.DELETE) {
    dialog.open(TicketCreateComponent, dialogConfig);
  } else {
    dialog.open(TicketDeleteComponent, dialogConfig);
  }
}
