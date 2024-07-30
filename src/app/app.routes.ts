import { Routes } from '@angular/router';
import { provideRouter, Route } from '@angular/router';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
  { path: '', component: GameComponent }
];

export const routerProviders = [provideRouter(routes)];
