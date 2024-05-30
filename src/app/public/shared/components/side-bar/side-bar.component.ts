import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

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

  @ViewChild(MatSidenav)
  protected sidenav!: MatSidenav;

  protected isMobile = true;

  protected isCollapsed = false;

  private observer: BreakpointObserver;

  constructor(observer: BreakpointObserver) {
    this.observer = observer;
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
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
