import { Component } from '@angular/core';
import { SideBarComponent } from '../shared/shared/components/side-bar/side-bar.component';
import { SideBarRoute } from '../shared/shared/models/side-bar-route';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../public/auth/models/auth-state';
import { authActions } from '../public/auth/data-access/auth-actions';

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

  constructor(protected router: Router, private store: Store<{ auth: AuthState }>) {
    this.router = router;
    this.routeList = [{
      path: '/private/dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
      action: undefined
    }, {
      path: '/auth',
      icon: 'logout',
      label: 'Logout',
      action: () => this.store.dispatch(authActions.clear())
    }];
  }

  protected navigate(routeName: string): void {
    this.router.navigateByUrl(`/${routeName}`).catch(error => console.log(error));
  }
}
