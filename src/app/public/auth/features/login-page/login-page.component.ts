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
import { NgForOf } from '@angular/common';
import { PublicPageComponent } from '../../../public-page.component';
import { Router } from '@angular/router';
import { renderError } from '../../../../shared/shared/util/constants';

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
    MatError
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent extends PublicPageComponent {

  public loginForm: FormGroup;

  constructor(protected router: Router, private formBuilder: FormBuilder, private store: Store<{ auth: AuthState }>) {
    super(router);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$')]],
    });
  }

  protected error(key: string): string {
    return renderError(this.loginForm.controls[key], key);
  }

  protected submitForm(): void {
    if (!this.loginForm.valid) {
      console.log('Not Valid');
    }
    this.store.dispatch(authActions.login({loginReq: {...this.loginForm.value}}));
  }
}
