import { BaseError } from './BaseError';

export class ApiError extends Error {

  public status: number;

  public errors: BaseError[];

  constructor(message: string, status: number, errors: BaseError[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
