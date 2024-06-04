import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {providers: [provideRouter(appRoutes), provideAnimationsAsync(), provideStore()]})
  .catch(error => console.error(error));
