import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NavigationStart, Router } from '@angular/router';
import { PublicPageComponent } from '../../../public-page.component';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { AuthState } from '../../models/auth-state';
import { environment } from '../../../../../environments/environment';
import { LoginViaGoogleReq } from '../../models/login-via-google-req';
import { authActions } from '../../data-access/auth-actions';
import { selectAuth, selectError } from '../../data-access/auth-reducers';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthMatFormField } from '../../models/auth-mat-form-field';
import { renderApiError, renderError } from '../../../../shared/shared/util/util';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-auth-google-page',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardTitleGroup,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './auth-google-page.component.html',
  styleUrl: './auth-google-page.component.scss'
})
export class AuthGooglePageComponent extends PublicPageComponent {

  protected authMatFormField: AuthMatFormField;

  protected formGroup: FormGroup;

  protected loginViaGoogleReq: LoginViaGoogleReq | undefined;

  protected apiError: ApiError | undefined;

  private readonly oauthConfig: AuthConfig;

  constructor(
    protected router: Router,
    private oAuthService: OAuthService,
    private store: Store<{ auth: AuthState }>,
    private formBuilder: FormBuilder
  ) {
    super(router);
    this.authMatFormField = {
      matLabel: 'Phone number',
      id: 'phoneNumber',
      formControlName: 'phoneNumber',
      type: 'text',
      autoComplete: '',
      key: 'phoneNumber'
    };
    this.formGroup = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]]
    });
    this.oauthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: 'http://localhost:4200/auth/code/google',
      clientId: environment.googleClientId,
      scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
      showDebugInformation: true,
      strictDiscoveryDocumentValidation: false,
    };
    this.oAuthService.configure(this.oauthConfig);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url !== '/auth/code/google') {
        this.oAuthService.logOut();
      }
    });
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken() || !this.oAuthService.hasValidIdToken()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.oAuthService.loadUserProfile().then(() => {
            this.loginViaGoogleReq = {
              email: this.oAuthService.getIdentityClaims().email,
              firstname: this.oAuthService.getIdentityClaims().family_name,
              lastname: this.oAuthService.getIdentityClaims().given_name,
              accessToken: this.oAuthService.getAccessToken(),
              phoneNumber: undefined
            };
            console.log(this.loginViaGoogleReq);
            this.store.dispatch(authActions.loginViaGoogle({
              loginViaGoogleReq: {
                ...this.loginViaGoogleReq,
              }
            }));
            this.store.select(selectError).subscribe((apiError) => {
              if (apiError && apiError.errors && !apiError.errors.find(error => error.description === 'phone number is invalid')) {
                this.oAuthService.logOut();
                this.navigate('/auth');
              } else {
                this.apiError = apiError;
              }
            });
            this.store.select(selectAuth).subscribe((auth) => {
              if (auth) {
                this.oAuthService.logOut();
                this.navigate('/private/dashboard');
              }
            });
          });
        }
      });
    });
  }

  protected error(key: string | undefined): string {
    return key ? renderError(this.formGroup.controls[key], key) : renderApiError(this.apiError);
  }

  protected onSubmit(): void {
    if (!this.formGroup.valid || !this.loginViaGoogleReq) {
      return;
    }
    this.store.dispatch(authActions.loginViaGoogle({
      loginViaGoogleReq: {
        ...this.loginViaGoogleReq,
        phoneNumber: this.formGroup.value.phoneNumber
      }
    }));
  }
}
