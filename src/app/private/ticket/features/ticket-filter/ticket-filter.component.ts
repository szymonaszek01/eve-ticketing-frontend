import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketState } from '../../models/ticket-state';
import { selectSort } from '../../data-access/ticket-reducers';
import { TicketSortComponent } from '../ticket-sort/ticket-sort.component';
import { ticketActions } from '../../data-access/ticket-actions';
import { TicketFilter } from '../../models/ticket-filter';
import { CustomTabComponent } from '../../../../shared/shared/components/custom-tab/custom-tab.component';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgForOf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { ticketListFilter } from '../../../../shared/shared/util/util';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';
import { AuthState } from '../../../../public/auth/models/auth-state';
import { User } from '../../../../shared/shared/models/user';

@Component({
  selector: 'app-ticket-filter',
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './ticket-filter.component.html',
  styleUrl: './ticket-filter.component.scss'
})
export class TicketFilterComponent {

  public filterForm: FormGroup;

  public sort: string[];

  private user: User | undefined;

  constructor(private formBuilder: FormBuilder,
              private authStore: Store<{ auth: AuthState }>,
              private ticketStore: Store<{ ticket: TicketState }>,
              private dialog: MatDialog
  ) {
    this.filterForm = this.formBuilder.group({
      code: [''],
      firstname: [''],
      lastname: [''],
      phoneNumber: [''],
      minCost: ['', [Validators.min(0)]],
      maxCost: ['', [Validators.min(0)]],
      minDate: [''],
      maxDate: [''],
      eventId: ['', [Validators.min(0)]]
    });
    this.sort = [];
  }

  ngOnInit(): void {
    this.authStore.select(selectAuth).subscribe(auth => this.user = auth);
    this.ticketStore.select(selectSort).subscribe(sort => this.sort = (sort ?? []).map(sortValue => {
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
    this.dialog.open(TicketSortComponent, dialogConfig);
  }

  protected submitForm(): void {
    if (!this.user || !this.filterForm.valid) {
      return;
    }
    const ticketFilter: any = {...ticketListFilter(this.user.id)};
    for (const valueKey in this.filterForm.value) {
      if (this.filterForm.value.hasOwnProperty(valueKey) && this.filterForm.value[valueKey]) {
        ticketFilter[valueKey] = (valueKey.includes('minDate') || valueKey.includes('maxDate'))
          ? this.filterForm.value[valueKey].toISOString()
          : this.filterForm.value[valueKey];
      }
    }
    this.ticketStore.dispatch(ticketActions.setFilter({filter: {...(ticketFilter as TicketFilter)}}));
  }
}
