import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../shared/shared/models/user';
import { ApiError } from '../../../../shared/shared/models/api-error';
import { AuthForm } from '../../../../public/auth/models/auth-form';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { removeFromLocalStorage, renderApiError, renderError } from '../../../../shared/shared/util/util';
import { authActions } from '../../../../public/auth/data-access/auth-actions';
import { BaseState } from '../../../../shared/shared/models/base-state';
import { UserFilter } from '../../models/user-filter';
import { userActions } from '../../data-access/user-actions';
import { selectLastUpdated } from '../../data-access/user-reducers';
import { Router } from '@angular/router';
import { AuthState } from '../../../../public/auth/models/auth-state';
import { selectError } from '../../../../public/auth/data-access/auth-reducers';

@Component({
  selector: 'app-user-edit',
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
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {

  protected apiError: ApiError | undefined;

  protected authForm: AuthForm;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UserEditComponent>,
              private formBuilder: FormBuilder,
              private router: Router,
              private authStore: Store<{ auth: AuthState }>,
              private userStore: Store<{ user: BaseState<User, UserFilter> }>
  ) {
    const user: User = data.user;
    this.apiError = undefined;
    this.authForm = {
      title: 'Edit profile',
      authMatFormFieldList: [{
        matLabel: 'Email',
        id: 'email',
        formControlName: 'email',
        type: 'email',
        autoComplete: 'email',
        key: 'email'
      }, {
        matLabel: 'Firstname',
        id: 'firstname',
        formControlName: 'firstname',
        type: 'text',
        autoComplete: 'firstname',
        key: 'firstname'
      }, {
        matLabel: 'Lastname',
        id: 'lastname',
        formControlName: 'lastname',
        type: 'text',
        autoComplete: 'lastname',
        key: 'lastname'
      }, {
        matLabel: 'Phone number',
        id: 'phoneNumber',
        formControlName: 'phoneNumber',
        type: 'text',
        autoComplete: '',
        key: 'phoneNumber'
      }],
      formGroup: this.formBuilder.group({
        email: [user.email, [Validators.required, Validators.email]],
        firstname: [user.firstname, [Validators.required]],
        lastname: [user.lastname, [Validators.required]],
        phoneNumber: [user.phoneNumber, [Validators.required]]
      }),
      differentAuthFormIcon: 'create',
      differentAuthFormTitle: 'Edit',
      action: (formGroup: FormGroup) => this.userStore.dispatch(userActions.update({values: {...formGroup.value}}))
    };
  }

  ngOnInit(): void {
    this.userStore.select(selectError).subscribe(apiError => this.apiError = apiError);
    this.userStore.select(selectLastUpdated).subscribe(user => {
      if (user) {
        this.userStore.dispatch(userActions.clear());
        this.authStore.dispatch(authActions.clear());
        removeFromLocalStorage('auth');
        this.dialogRef.close();
        window.location.reload();
      }
    });
  }

  protected error(key: string | undefined): string {
    return key ? renderError(this.authForm.formGroup.controls[key], key) : renderApiError(this.apiError);
  }

  protected onInput(): void {
    if (this.apiError) {
      this.userStore.dispatch(userActions.loadError({error: undefined}));
    }
  }

  protected onSubmit(): void {
    if (!this.authForm.formGroup.valid) {
      return;
    }
    this.authForm.action(this.authForm.formGroup);
  }
}
