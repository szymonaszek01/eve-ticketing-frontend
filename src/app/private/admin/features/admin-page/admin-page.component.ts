import { Component } from '@angular/core';
import { PrivatePageComponent } from '../../../private-page.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent extends PrivatePageComponent {

}
