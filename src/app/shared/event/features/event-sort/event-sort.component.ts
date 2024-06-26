import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { BaseState } from '../../../shared/models/base-state';
import { Event } from '../../models/event';
import { MatDialogActions, MatDialogClose, MatDialogContainer, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgForOf } from '@angular/common';
import { ToggleButton } from '../../../shared/models/toggle-button';
import { eventActions } from '../../data-access/event-actions';
import { EventFilter } from '../../models/event-filter';

@Component({
  selector: 'app-event-sort',
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
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatDialogContainer,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgForOf,
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './event-sort.component.html',
  styleUrl: './event-sort.component.scss'
})
export class EventSortComponent {

  public sortForm: FormGroup;

  public toggleButtonList: ToggleButton[];

  constructor(private formBuilder: FormBuilder, private store: Store<{ event: BaseState<Event, EventFilter> }>) {
    this.sortForm = this.formBuilder.group({
      id: [''],
      start_at: [''],
      end_at: [''],
      unit_price: [''],
      max_ticket_amount: [''],
      students_discount: [''],
      children_discount: ['']
    });
    this.toggleButtonList = [];
    for (const key in this.sortForm.value) {
      if (this.sortForm.value.hasOwnProperty(key)) {
        this.toggleButtonList.push({key, label: key.replace(new RegExp('_', 'g'), ' ')});
      }
    }
  }

  protected submitForm(): void {
    const sort: string[] = [];
    for (const valueKey in this.sortForm.value) {
      if (this.sortForm.value.hasOwnProperty(valueKey) && this.sortForm.value[valueKey]) {
        sort.push(`${valueKey},${this.sortForm.value[valueKey]}`);
      }
    }
    this.store.dispatch(eventActions.setSort({sort}));
  }
}
