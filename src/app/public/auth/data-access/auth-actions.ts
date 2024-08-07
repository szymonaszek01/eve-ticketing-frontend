import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Auth } from '../models/auth';
import { ApiError } from '../../../shared/shared/models/api-error';
import { LoginReq } from '../models/login-req';
import { RegisterReq } from '../models/register-req';
import { RegenerateAuthTokenReq } from '../models/regenerate-auth-token-req';
import { LoginViaGoogleReq } from '../models/login-via-google-req';
import { FirebaseRes } from '../../../shared/firebase/models/firebase-res';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ loginReq: LoginReq }>(),
    'Login success': props<{ auth: Auth }>(),
    'Login via Google': props<{ loginViaGoogleReq: LoginViaGoogleReq }>(),
    'Login via Google success': props<{ auth: Auth }>(),
    Register: props<{ registerReq: RegisterReq }>(),
    'Register success': props<{ auth: Auth }>(),
    'Regenerate auth token': props<{ regenerateAuthTokenReq: RegenerateAuthTokenReq }>(),
    'Regenerate auth token success': props<{ auth: Auth }>(),
    'Upload auth image': props<{ file: File, entity: string, id: number, field: string, update: boolean }>(),
    'Upload auth image success': props<{ firebaseRes: FirebaseRes }>(),
    Clear: emptyProps(),
    'Load error': props<{ error: ApiError | undefined }>()
  }
});
