import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketShoppingCartItemComponent } from '../../components/ticket-shopping-cart-item/ticket-shopping-cart-item.component';
import { Store } from '@ngrx/store';
import { TicketState } from '../../models/ticket-state';
import { Ticket } from '../../models/ticket';
import { selectReservedList } from '../../data-access/ticket-reducers';
import { ticketActions } from '../../data-access/ticket-actions';
import { TicketFilter } from '../../models/ticket-filter';
import { AuthState } from '../../../../public/auth/models/auth-state';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';

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
              private authStore: Store<{ auth: AuthState }>
  ) {
    this.ticketReservedList = [{
      id: 1,
      code: 'hgru-12fg-ko12-loq3-opqo',
      createdAt: new Date(),
      firstname: 'Ann',
      lastname: 'Thomason',
      phoneNumber: '+48701123345',
      cost: 200,
      isAdult: true,
      isStudent: false,
      paid: false,
      event: {
        id: 1,
        name: 'Test event 1',
        description: 'test event 1 is really good event',
        maxTicketAmount: 1000,
        isSoldOut: false,
        unitPrice: 200,
        currency: '$',
        childrenDiscount: 30,
        studentsDiscount: 50,
        startAt: new Date(),
        endAt: new Date(),
        country: 'Poland',
        address: 'Tadeusza Rechniewskiego 13/146',
        localizationName: 'Pepsi stadium',
        isWithoutSeats: false,
        adminId: 1
      },
      seat: {
        id: 1,
        sector: 'Sector A',
        row: 1,
        number: 1,
        occupied: true,
        eventId: 1
      },
      user: {
        id: 1,
        email: 'jan.kowalski@gmail.com',
        createdAt: new Date(),
        firstname: 'Jan',
        lastname: 'Kowalski',
        phoneNumber: '+48800800800',
        role: 'USER',
        image: ''
      }
    }, {
      id: 2,
      code: 'horu-1ofg-ko1o-loq9-opqo',
      createdAt: new Date(),
      firstname: 'Cate',
      lastname: 'Lung',
      phoneNumber: '+48601123345',
      cost: 300,
      isAdult: true,
      isStudent: false,
      paid: false,
      event: {
        id: 2,
        name: 'Test event 2',
        description: 'test event 2 is really good event',
        maxTicketAmount: 1000,
        isSoldOut: false,
        unitPrice: 300,
        currency: '$',
        childrenDiscount: 30,
        studentsDiscount: 50,
        startAt: new Date(),
        endAt: new Date(),
        country: 'England',
        address: 'Smith street 13/106',
        localizationName: 'Sprint stadium',
        isWithoutSeats: false,
        adminId: 1
      },
      seat: {
        id: 910,
        sector: 'Sector b',
        row: 1,
        number: 1,
        occupied: true,
        eventId: 2
      },
      user: {
        id: 1,
        email: 'jan.kowalski@gmail.com',
        createdAt: new Date(),
        firstname: 'Jan',
        lastname: 'Kowalski',
        phoneNumber: '+48800800800',
        role: 'USER',
        image: ''
      }
    }];
    this.authStore.select(selectAuth).subscribe(auth => {
      if (!auth) {
        return;
      }
      const paymentTime = 1000 * 60 * 15;
      const date = new Date();
      const ticketFilter: TicketFilter = {
        code: '',
        firstname: '',
        lastname: '',
        phoneNumber: '',
        minCost: '',
        maxCost: '',
        minDate: new Date(Math.floor(date.getTime() / paymentTime) * paymentTime).toISOString(),
        maxDate: '',
        eventId: 0,
        userId: auth.id,
        seatId: 0,
        paid: false
      };
      this.ticketStore.dispatch(ticketActions.loadReserved({page: 0, size: 5, filter: ticketFilter, sort: undefined}));
    });
  }

  ngOnInit(): void {
    this.ticketStore.select(selectReservedList).subscribe(reservedList => this.ticketReservedList = reservedList);
  }

  protected submitForm(): void {
    console.log(`Submit ticket form`);
  }
}
