import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicPageComponent } from '../../../public-page.component';
import { EventListComponent } from '../../../../shared/event/features/event-list/event-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    EventListComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent extends PublicPageComponent {

  constructor(protected router: Router) {
    super(router);
  }
}
