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
import { NgForOf, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { BaseState } from '../../../shared/models/base-state';
import { Event } from '../../models/event';
import { eventActions } from '../../data-access/event-actions';
import { EventFilter } from '../../models/event-filter';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventSortComponent } from '../event-sort/event-sort.component';
import { selectSort } from '../../data-access/event-reducers';

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
    ReactiveFormsModule,
    MatIcon,
    NgForOf
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './event-filter.component.html',
  styleUrl: './event-filter.component.scss'
})
export class EventFilterComponent {

  public filterForm: FormGroup;

  public sort: string[];

  constructor(private formBuilder: FormBuilder, private store: Store<{ event: BaseState<Event> }>, private dialog: MatDialog) {
    this.filterForm = this.formBuilder.group({
      name: [''],
      minUnitPrice: ['', [Validators.min(0)]],
      maxUnitPrice: ['', [Validators.min(0)]],
      minDate: [''],
      maxDate: [''],
      country: [''],
      address: ['']
    });
    this.sort = [];
  }

  ngOnInit(): void {
    this.store.select(selectSort).subscribe(sort => this.sort = (sort ?? []).map(sortValue => {
      const splitSortValue: string[] = sortValue.split(',');
      return `${splitSortValue[0].replace(new RegExp('_', 'g'), ' ').toUpperCase()},${splitSortValue[1]}`;
    }));
  }

  public openDialog(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.maxWidth = '25rem';
    this.dialog.open(EventSortComponent, dialogConfig);
  }

  protected submitForm(): void {
    const eventFilter: any = {};
    if (!this.filterForm.valid) {
      console.log('Not Valid');
    }
    for (const valueKey in this.filterForm.value) {
      if (this.filterForm.value.hasOwnProperty(valueKey) && this.filterForm.value[valueKey]) {
        eventFilter[valueKey] = (valueKey.includes('minDate') || valueKey.includes('maxDate'))
          ? this.filterForm.value[valueKey].toISOString()
          : this.filterForm.value[valueKey];
      }
    }
    this.store.dispatch(eventActions.setFilter({filter: {...(eventFilter as EventFilter)}}));
  }
}
