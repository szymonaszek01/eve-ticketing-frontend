import { Route } from '@angular/router';

export interface SideBarRoute extends Route {
  icon: string;
  label: string;
  action: (() => void) | undefined;
  active: boolean;
}
