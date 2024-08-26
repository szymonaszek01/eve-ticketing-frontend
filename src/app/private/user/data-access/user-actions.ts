import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserFilter } from '../models/user-filter';
import { Page } from '../../../shared/shared/models/page';
import { User } from '../../../shared/shared/models/user';
import { ApiError } from '../../../shared/shared/models/api-error';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    Load: props<{ page: number, size: number, filter: UserFilter | undefined, sort: string[] | undefined }>(),
    'Load success': props<{ page: Page<User> }>(),
    Update: props<{ values: any }>(),
    'Update success': props<{ user: User }>(),
    Remove: props<{ user: User }>(),
    'Remove success': props<{ user: User }>(),
    Clear: emptyProps(),
    'Load error': props<{ error: ApiError | undefined}>(),
    'Set filter': props<{ filter: UserFilter }>(),
    'Set sort': props<{ sort: string[] }>()
  }
});
