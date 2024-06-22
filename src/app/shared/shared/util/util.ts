import { AbstractControl } from '@angular/forms';
import { ApiError } from '../models/api-error';

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
  return apiError?.errors.map(error => error.description).join(', ') ?? '';
}

export function capitalize(value: string): string {
  return value[0].toUpperCase() + value.substring(1).toLowerCase();
}

export function space(key: string): string {
  return key.replace(/[A-Z-_\\&](?=[a-z0-9]+)|[A-Z-_\\&]+(?![a-z0-9])/g, ' $&').trim();
}
