import { Component } from '@angular/core';
import { SideBarComponent } from '../shared/shared/components/side-bar/side-bar.component';
import { SideBarRoute } from '../shared/shared/models/side-bar-route';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../public/auth/models/auth-state';
import { authActions } from '../public/auth/data-access/auth-actions';
import { removeFromLocalStorage } from '../shared/shared/util/util';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketShoppingCartComponent } from './ticket/features/ticket-shopping-cart/ticket-shopping-cart.component';
import { TicketState } from './ticket/models/ticket-state';
import { selectAuth } from '../public/auth/data-access/auth-reducers';

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

  private adminRouteNameList: string[];

  constructor(protected router: Router,
              protected authStore: Store<{ auth: AuthState }>,
              protected ticketStore: Store<{ ticket: TicketState }>,
              protected dialog: MatDialog
  ) {
    this.router = router;
    this.adminRouteNameList = ['Admin panel'];
    this.routeList = [{
      path: '/private/dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
      action: undefined,
      active: true
    }, {
      path: undefined,
      icon: 'shopping_cart_checkout',
      label: 'Shopping cart',
      action: () => {
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '100%';
        dialogConfig.maxWidth = '80rem';
        this.dialog.open(TicketShoppingCartComponent, dialogConfig);
      },
      active: true
    }, {
      path: '/private/ticket-list',
      icon: 'playlist_add_check',
      label: 'Tickets',
      action: undefined,
      active: true
    }, {
      path: '/private/admin',
      icon: 'admin_panel_settings',
      label: 'Admin panel',
      action: undefined,
      active: false
    }, {
      path: '/auth',
      icon: 'logout',
      label: 'Logout',
      action: () => {
        this.authStore.dispatch(authActions.clear());
        removeFromLocalStorage('auth');
      },
      active: true
    }];
  }

  ngOnInit(): void {
    this.authStore.select(selectAuth).subscribe(auth => {
      if (auth) {
        this.routeList
          .filter(route => this.adminRouteNameList.includes(route.label))
          .forEach(route => route.active = auth.role === 'ADMIN');
      }
    });
  }

  protected navigate(routeName: string): void {
    this.router.navigateByUrl(`/${routeName}`).catch(error => console.log(error));
  }
}
