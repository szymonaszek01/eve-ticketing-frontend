import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../models/auth-state';
import { authActions } from '../../data-access/auth-actions';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { PublicPageComponent } from '../../../public-page.component';
import { Router } from '@angular/router';
import { renderApiError, renderError } from '../../../../shared/shared/util/util';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { selectAuth, selectError } from '../../data-access/auth-reducers';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CustomTabComponent,
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardTitleGroup,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    NgForOf,
    ReactiveFormsModule,
    MatError,
    NgIf,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent extends PublicPageComponent {

  public loginForm: FormGroup;

  public apiError: ApiError | undefined;

  constructor(protected router: Router, private formBuilder: FormBuilder, private store: Store<{ auth: AuthState }>) {
    super(router);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$')]],
    });
    this.apiError = undefined;
  }

  ngOnInit(): void {
    this.store.select(selectError).subscribe(apiError => this.apiError = apiError);
    this.store.select(selectAuth).subscribe(auth => {
      // navigate to private page
    });
  }

  protected error(key: string | undefined): string {
    return key ? renderError(this.loginForm.controls[key], key) : renderApiError(this.apiError);
  }

  protected onInput(): void {
    if (this.apiError) {
      this.store.dispatch(authActions.loadError({error: undefined}));
    }
  }

  protected submitForm(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.store.dispatch(authActions.login({loginReq: {...this.loginForm.value}}));
  }
}
