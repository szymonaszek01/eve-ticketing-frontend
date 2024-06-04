import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { SideBarRoute } from './shared/models/SideBarRoute';

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
      label: 'Home'
    }, {
      path: '/login',
      icon: 'login',
      label: 'Login'
    }, {
      path: '/contact',
      icon: 'mail',
      label: 'Contact'
    }, {
      path: '/settings',
      icon: 'settings',
      label: 'Settings'
    }];
  }

  protected navigate(routeName: string): void {
    this.router.navigateByUrl(`/${routeName}`).catch(error => console.log(error));
  }
}
