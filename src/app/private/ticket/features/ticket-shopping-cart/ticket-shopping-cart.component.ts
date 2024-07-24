import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketShoppingCartItemComponent } from '../../components/ticket-shopping-cart-item/ticket-shopping-cart-item.component';
import { Store } from '@ngrx/store';
import { TicketState } from '../../models/ticket-state';
import { Ticket } from '../../models/ticket';
import { selectReservedList } from '../../data-access/ticket-reducers';
import { TicketPayComponent } from '../ticket-pay/ticket-pay.component';

@Component({
  selector: 'app-ticket-shopping-cart',
  standalone: true,
  imports: [
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    TicketShoppingCartItemComponent
  ],
  templateUrl: './ticket-shopping-cart.component.html',
  styleUrl: './ticket-shopping-cart.component.scss'
})
export class TicketShoppingCartComponent {

  protected ticketReservedList: Ticket[];

  constructor(protected ticketStore: Store<{ ticket: TicketState }>,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<TicketShoppingCartItemComponent>
  ) {
    this.ticketReservedList = [];
  }

  ngOnInit(): void {
    this.ticketStore.select(selectReservedList).subscribe(reservedList => {
      this.ticketReservedList = reservedList;
      if (reservedList.length < 1) {
        this.dialogRef.close();
      }
    });
  }

  protected submitForm(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.maxWidth = '25rem';
    this.dialog.open(TicketPayComponent, dialogConfig);
  }
}
