import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../shared/shared/components/side-bar/side-bar.component';
import { SideBarRoute } from '../shared/shared/models/side-bar-route';

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

  protected routeList: SideBarRoute[];

  constructor(protected router: Router) {
    this.router = router;
    this.routeList = [{
      path: '/',
      icon: 'house',
      label: 'Home',
      action: undefined
    }, {
      path: '/auth',
      icon: 'login',
      label: 'Login',
      action: undefined
    }, {
      path: '/contact',
      icon: 'mail',
      label: 'Contact',
      action: undefined
    }, {
      path: '/settings',
      icon: 'settings',
      label: 'Settings',
      action: undefined
    }];
  }

  protected navigate(routeName: string): void {
    this.router.navigateByUrl(`/${routeName}`).catch(error => console.log(error));
  }
}
