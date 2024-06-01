import { Event } from '../models/Event';
import { EventFilterDto } from '../dtos/EventFilterDto';
import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<Event, EventFilterDto> {

  private eventList: Event[] = [{
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
  }, {
    id: 2,
    name: 'Test event 2',
    description: 'test event 1 is really good event',
    maxTicketAmount: 1500,
    isSoldOut: false,
    unitPrice: 250,
    currency: '$',
    childrenDiscount: 30,
    studentsDiscount: 50,
    startAt: new Date(),
    endAt: new Date(),
    country: 'Poland',
    address: 'Tadeusza Rechniewskiego 15/146',
    localizationName: 'Anders stadium',
    isWithoutSeats: false,
    adminId: 1
  }];

  create(event: Event): Event | undefined {
    return this.eventList[0];
  }

  delete(id: number): void {
  }

  getAll(page: number, size: number, filter: EventFilterDto | undefined): Event[] {
    return this.eventList;
  }

  getOne(id: number): Event | undefined {
    return this.eventList[id < 2 ? id : 0];
  }

  update(event: Event): Event | undefined {
    return this.eventList[0];
  }
}
