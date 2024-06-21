import { FormGroup } from '@angular/forms';
import { AuthMatFormField } from './auth-mat-form-field';

export interface AuthForm {
  title: string;
  formGroup: FormGroup;
  authMatFormFieldList: AuthMatFormField[];
  differentAuthFormIcon: string;
  differentAuthFormTitle: string;
  action: (formGroup: FormGroup) => void;
}
