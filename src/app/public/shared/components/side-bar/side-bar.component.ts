import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SideBarRoute } from '../../models/SideBarRoute';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    FormsModule,
    RouterOutlet,
    NgOptimizedImage
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})

export class SideBarComponent {

  @Input()
  public routeList: SideBarRoute[];

  @ViewChild(MatSidenav)
  protected sidenav!: MatSidenav;

  protected isMobile: boolean;

  protected isCollapsed: boolean;

  private observer: BreakpointObserver;

  constructor(observer: BreakpointObserver) {
    this.isMobile = true;
    this.isCollapsed = false;
    this.observer = observer;
    this.routeList = [];
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 768px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });
  }

  protected toggleMenu(): void {
    if (this.isMobile) {
      this.sidenav.toggle().catch(error => console.log(error));
      this.isCollapsed = false;
    } else {
      this.sidenav.open().catch(error => console.log(error));
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
