import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [
    SideBarComponent,
    RouterOutlet
  ],
  templateUrl: './public-page.component.html'
})
export class PublicPageComponent {

  protected router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  protected navigate(routeName: string): void {
    this.router.navigateByUrl(`/${routeName}`).catch(error => console.log(error));
  }
}
