import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { PublicPageComponent } from '../../../public-page.component';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../models/auth-state';
import { AuthForm } from '../../models/auth-form';
import { selectAuth, selectError } from '../../data-access/auth-reducers';
import { renderApiError, renderError } from '../../../../shared/shared/util/util';
import { authActions } from '../../data-access/auth-actions';
import { AuthMatFormField } from '../../models/auth-mat-form-field';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    FormsModule,
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
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent extends PublicPageComponent {

  public apiError: ApiError | undefined;

  public authForm: AuthForm;

  public isLogin: boolean;

  private commonAuthMatFormFieldList: AuthMatFormField[];

  constructor(protected router: Router, private store: Store<{ auth: AuthState }>, private formBuilder: FormBuilder) {
    super(router);
    this.apiError = undefined;
    this.isLogin = true;
    this.commonAuthMatFormFieldList = [{
      matLabel: 'Email',
      id: 'email',
      formControlName: 'email',
      type: 'email',
      autoComplete: 'email',
      key: 'email'
    }, {
      matLabel: 'Password',
      id: 'password',
      formControlName: 'password',
      type: 'password',
      autoComplete: 'new-password',
      key: 'password'
    }
    ];
    this.authForm = this.getAuthForm();
  }

  ngOnInit(): void {
    this.store.select(selectError).subscribe(apiError => this.apiError = apiError);
    this.store.select(selectAuth).subscribe(auth => {
      // navigate to private page
    });
  }

  protected updateAuthForm(): void {
    this.isLogin = !this.isLogin;
    this.authForm = this.getAuthForm();
  }

  protected getAuthForm(): AuthForm {
    return this.isLogin ? {
      title: 'Login',
      formGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$')]],
      }),
      authMatFormFieldList: [...this.commonAuthMatFormFieldList],
      differentAuthFormIcon: 'create',
      differentAuthFormTitle: 'Register',
      action: (formGroup: FormGroup) => this.store.dispatch(authActions.login({loginReq: {...formGroup.value}}))
    } : {
      title: 'Register',
      formGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$')]],
      }),
      authMatFormFieldList: [...this.commonAuthMatFormFieldList],
      differentAuthFormIcon: 'login',
      differentAuthFormTitle: 'Login',
      action: (formGroup: FormGroup) => this.store.dispatch(authActions.register({registerReq: {...formGroup.value}}))
    };
  }

  protected error(key: string | undefined): string {
    return key ? renderError(this.authForm.formGroup.controls[key], key) : renderApiError(this.apiError);
  }

  protected onInput(): void {
    if (this.apiError) {
      this.store.dispatch(authActions.loadError({error: undefined}));
    }
  }

  protected onSubmit(): void {
    if (!this.authForm.formGroup.valid) {
      return;
    }
    this.authForm.action(this.authForm.formGroup);
  }
}
