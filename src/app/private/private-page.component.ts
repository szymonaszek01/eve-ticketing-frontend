import { Component } from '@angular/core';
import { SideBarComponent } from '../shared/shared/components/side-bar/side-bar.component';
import { SideBarRoute } from '../shared/shared/models/side-bar-route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-page',
  standalone: true,
  imports: [
    SideBarComponent
  ],
  templateUrl: './private-page.component.html',
})
export class PrivatePageComponent {

  protected routeList: SideBarRoute[];

  constructor(protected router: Router) {
    this.router = router;
    this.routeList = [{
      path: '/private/dashboard',
      icon: 'dashboard',
      label: 'Dashboard'
    }, {
      path: '/',
      icon: 'logout',
      label: 'Logout'
    }];
  }

  protected navigate(routeName: string): void {
    this.router.navigateByUrl(`/${routeName}`).catch(error => console.log(error));
  }
}
