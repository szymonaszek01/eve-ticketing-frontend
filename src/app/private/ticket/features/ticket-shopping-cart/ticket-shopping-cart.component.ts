import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketShoppingCartItemComponent } from '../../components/ticket-shopping-cart-item/ticket-shopping-cart-item.component';

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

  protected submitForm(): void {
    console.log(`Submit ticket form`);
  }
}
