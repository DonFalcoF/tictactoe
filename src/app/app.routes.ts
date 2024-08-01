import { Routes } from '@angular/router';
import { provideRouter, Route } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { GameSetupComponent } from './pages/game-setup/game-setup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component: GameSetupComponent },
  { path: 'game', component: GameComponent }
];

export const routerProviders = [provideRouter(routes)];
