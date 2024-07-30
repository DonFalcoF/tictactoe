import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardComponent } from '../board/board.component';
import { GameService } from '../../services/game.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  playerType: 'X' | 'O' = 'X';
  gridSize: number = 3;
  gridSizes = [3, 4, 5];

  constructor(public gameService: GameService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.newGame();
  }

  onPlayerTypeChange(type: 'X' | 'O'): void {
    this.playerType = type;
    this.gameService.setPlayerType(type);
  }

  newGame(size: number = this.gridSize): void {
    this.gridSize = size;
    this.gameService.newGame(this.gridSize);
    this.updateGridStyles();
  }

  private updateGridStyles(): void {
    const cellSize = 100; // Taille de cellule par défaut
    const gridSize = this.gridSize;

    this.document.documentElement.style.setProperty('--grid-size', gridSize.toString());
    this.document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
  }

}
