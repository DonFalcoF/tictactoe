import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, GameOverModalComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(
    public gameService: GameService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.gameService.isGameInitialized()) {
      this.router.navigate(['/setup']);
    } else {
      this.updateGridStyles();
    }
  }

  onCellClick(row: number, col: number): void {
    if (this.gameService.makeMove(row, col)) {
      this.makeComputerMove();
    }
  }

  makeComputerMove(): void {
    if (
      !this.gameService.isGameOver() &&
      this.gameService.getCurrentPlayer() !==
        this.gameService.getInitialPlayer()
    ) {
      if (this.gameService.isAnimating) {
        this.gameService.isAnimating = false;
        this.gameService.makeRandomMove();
      } else {
        this.gameService.makeRandomMove();
      }
    }
  }

  onReplay(): void {
    this.gameService.isAnimating = false;
    this.gameService.winningLine = [];
    this.router.navigate(['/setup']);
  }

  private updateGridStyles(): void {
    const cellSize = 120; // Taille de cellule par défaut
    const gridSize = this.gameService.getGridSize();
    gridSize > 4
      ? this.document.documentElement.style.setProperty(
          '--cell-size',
          `${cellSize - 20}px`
        )
      : this.document.documentElement.style.setProperty(
          '--cell-size',
          `${cellSize}px`
        );
    this.document.documentElement.style.setProperty(
      '--grid-size',
      gridSize.toString()
    );
  }
}
