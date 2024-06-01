import { Event } from '../models/Event';
import { EventFilterDto } from '../dtos/EventFilterDto';

export class EventService extends BaseService<Event, EventFilterDto> {
  create(event: Event): Event | undefined {
    return undefined;
  }

  delete(id: number): void {
  }

  getAll(page: number, size: number, filter: EventFilterDto): Event[] {
    return [];
  }

  getOne(id: number): Event | undefined {
    return undefined;
  }

  update(event: Event): Event | undefined {
    return undefined;
  }
}
