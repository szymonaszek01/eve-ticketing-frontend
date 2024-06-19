import { AbstractControl } from '@angular/forms';
import { ApiError } from '../models/api-error';

export function renderError(formControl: AbstractControl, key: string): string {
  if (formControl.hasError('required')) {
    return `Field ${capitalize(key)} is required`;
  }
  if (formControl.hasError('email')) {
    return `Invalid email structure`;
  }
  if (formControl.hasError('pattern')) {
    return `Password should be at least 8 characters long, contain at least one digit, one uppercase letter, one lowercase letter and one special character`;
  }
  return '';
}

export function renderApiError(apiError: ApiError | undefined): string {
  return apiError?.errors.map(error => error.description).join(', ') ?? '';
}

export function capitalize(value: string): string {
  return value[0].toUpperCase() + value.substring(1);
}
