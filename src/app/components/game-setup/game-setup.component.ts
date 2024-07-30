import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css'],
})
export class GameSetupComponent {
  playerType: 'X' | 'O' = 'X';
  gridSize: number = 3;
  gridSizes = [3, 4];

  constructor(private router: Router, private gameService: GameService) {}

  startGame(): void {
    this.gameService.setPlayerType(this.playerType);
    this.gameService.newGame(this.gridSize);
    this.router.navigate(['/game']).then(() => {
      if (this.playerType === 'O') {
        this.gameService.setCurrentPlayer('X'); // Set current player to 'X' for the first move
        this.gameService.makeRandomMove();
        this.gameService.setCurrentPlayer('O'); // Set current player back to 'O'
      }
    });
  }

  selectPlayerType(type: 'X' | 'O'): void {
    this.playerType = type;
  }

  selectGridSize(size: number): void {
    this.gridSize = size;
  }

}
