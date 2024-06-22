import { Component, Input } from '@angular/core';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { RoundedIconComponent } from '../rounded-icon/rounded-icon.component';
import { MatListItem } from '@angular/material/list';
import { SideBarRoute } from '../../models/side-bar-route';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RoundedIconComponent,
    MatListItem,
    NgForOf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input()
  public routeList: SideBarRoute[];

  constructor() {
    this.routeList = [];
  }
}
