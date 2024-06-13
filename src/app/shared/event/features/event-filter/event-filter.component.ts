import { Component } from '@angular/core';
import { CustomTabComponent } from '../../../shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { selectPage, selectSize } from '../../data-access/event-reducers';
import { Store } from '@ngrx/store';
import { BaseState } from '../../../shared/models/base-state';
import { Event } from '../../models/event';
import { eventActions } from '../../data-access/event-actions';
import { EventFilter } from '../../models/event-filter';

@Component({
  selector: 'app-event-filter',
  standalone: true,
  imports: [
    CustomTabComponent,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatChip,
    NgIf,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './event-filter.component.html',
  styleUrl: './event-filter.component.scss'
})
export class EventFilterComponent {

  public filterForm: FormGroup;

  private page: number;

  private size: number;

  constructor(private formBuilder: FormBuilder, private store: Store<{ event: BaseState<Event> }>) {
    this.filterForm = this.formBuilder.group({
      name: [''],
      minUnitPrice: ['', [Validators.min(0)]],
      maxUnitPrice: ['', [Validators.min(0)]],
      minDate: [''],
      maxDate: [''],
      country: [''],
      address: ['']
    });
    this.page = 0;
    this.size = 0;
  }

  ngOnInit(): void {
    this.store.select(selectPage).subscribe(page => this.page = page);
    this.store.select(selectSize).subscribe(size => this.size = size);
  }

  protected submitForm(): void {
    const eventFilter: any = {};
    for (const valueKey in this.filterForm.value) {
      if (this.filterForm.value.hasOwnProperty(valueKey) && this.filterForm.value[valueKey]) {
        eventFilter[valueKey] = this.filterForm.value[valueKey];
      }
    }
    this.store.dispatch(eventActions.load({page: 0, size: 10, filter: eventFilter as EventFilter}));
  }
}
