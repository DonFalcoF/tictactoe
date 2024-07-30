import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private board!: string[][];
  private currentPlayer!: string;
  private gameOver!: boolean;
  private gridSize!: number; // Taille de la grille

  constructor() {
    this.gridSize = 3; // Valeur par défaut
    this.newGame(this.gridSize);
  }

  newGame(gridSize: number = 3): void {
    this.gridSize = gridSize;
    // Générer la grille en fonction de la taille choisie
    this.board = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => '')
    );
    this.currentPlayer = 'X';
    this.gameOver = false;
    console.log('Board after initialization', this.board);
  }

  setPlayerType(playerType: 'X' | 'O'): void {
    this.currentPlayer = playerType;
  }

  getBoard(): string[][] {
    return this.board;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  makeMove(row: number, col: number): boolean {
    if (this.board[row][col] === '' && !this.gameOver) {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWin()) {
        this.gameOver = true;
      } else if (this.isBoardFull()) {
        this.gameOver = true;
      } else {
        this.switchPlayer();
        if (this.currentPlayer === 'O') {
          this.makeRandomMove();
        }
      }
      return true;
    }
    return false;
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  private isBoardFull(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== ''));
  }

  private checkWin(): boolean {
    const winLines = this.generateWinLines();
    return winLines.some((line) =>
      line.every(([x, y]) => this.board[x][y] === this.currentPlayer)
    );
  }

  private generateWinLines(): number[][][] {
    const lines: number[][][] = [];
    const n = this.gridSize;

    // Génération des lignes et colonnes
    for (let i = 0; i < n; i++) {
      lines.push(Array.from({ length: n }, (_, j) => [i, j])); // Ligne
      lines.push(Array.from({ length: n }, (_, j) => [j, i])); // Colonne
    }

    // Diagonales
    lines.push(Array.from({ length: n }, (_, i) => [i, i])); // Diagonale principale
    lines.push(Array.from({ length: n }, (_, i) => [i, n - 1 - i])); // Diagonale secondaire

    return lines;
  }

  private makeRandomMove(): void {
    const emptyCells: number[][] = [];
    this.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === '') {
          emptyCells.push([rowIndex, colIndex]);
        }
      });
    });

    if (emptyCells.length > 0) {
      const [row, col] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.board[row][col] = this.currentPlayer;
      if (this.checkWin()) {
        this.gameOver = true;
      } else if (this.isBoardFull()) {
        this.gameOver = true;
      } else {
        this.switchPlayer();
      }
    }
  }
}
