import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleButton } from '../../../../shared/shared/models/toggle-button';
import { Store } from '@ngrx/store';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { TicketState } from '../../models/ticket-state';
import { ticketActions } from '../../data-access/ticket-actions';

@Component({
  selector: 'app-ticket-sort',
  standalone: true,
  imports: [
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './ticket-sort.component.html',
  styleUrl: './ticket-sort.component.scss'
})
export class TicketSortComponent {

  public sortForm: FormGroup;

  public toggleButtonList: ToggleButton[];

  constructor(private formBuilder: FormBuilder, private store: Store<{ ticket: TicketState }>) {
    this.sortForm = this.formBuilder.group({
      created_at: [''],
      cost: [''],
      event_id: [''],
      seat_id: ['']
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
    this.store.dispatch(ticketActions.setSort({sort}));
  }
}
