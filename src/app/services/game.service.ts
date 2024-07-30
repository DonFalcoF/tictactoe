import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private board!: string[][];
  private currentPlayer!: 'X' | 'O';
  private initialPlayer!: 'X' | 'O';
  private gameOver!: boolean;
  private gridSize!: number;
  private initialized: boolean = false;
  private winner: string | null = null;
  private winningLine: number[][] = [];
  isAnimating: boolean = false;

  constructor() {}

  newGame(gridSize: number): void {
    this.gridSize = gridSize;
    this.board = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => '')
    );
    this.gameOver = false;
    this.initialized = true;
    this.winner = null;
  }

  isGameInitialized(): boolean {
    return this.initialized;
  }

  getGridSize(): number {
    return this.gridSize;
  }

  setPlayerType(playerType: 'X' | 'O'): void {
    this.initialPlayer = playerType;
    this.currentPlayer = playerType;
  }

  setCurrentPlayer(playerType: 'X' | 'O'): void {
    this.currentPlayer = playerType;
  }

  getCurrentPlayer(): 'X' | 'O' {
    return this.currentPlayer;
  }

  getInitialPlayer(): 'X' | 'O' {
    return this.initialPlayer;
  }

  getBoard(): string[][] {
    return this.board;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  getWinner(): string | null {
    return this.winner;
  }

  makeMove(row: number, col: number): boolean {
    if (this.board[row][col] === '' && !this.gameOver) {
      this.isAnimating = true;
      this.board[row][col] = this.currentPlayer;
      if (this.checkWin()) {
        // pause de 1 seconde avant de déclarer le gagnant
        setTimeout(() => {
          this.gameOver = true;
          this.isAnimating = false;
          this.winner = this.currentPlayer;
        }, 1500);
      } else if (this.isBoardFull()) {
        this.gameOver = true;
        this.winner = null; // Match nul
      } else {
        this.switchPlayer();
      }
      return true;
    }
    return false;
  }

  makeRandomMove(): void {
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
        this.isAnimating = true;
        this.gameOver = true;
        this.winner = this.currentPlayer;
      } else if (this.isBoardFull()) {
        this.gameOver = true;
        this.winner = null; // Match nul
      } else {
        this.switchPlayer();
      }
    }
  }

  isWinningCell(row: number, col: number): boolean {
    return this.winningLine.some(([x, y]) => x === row && y === col);
  }

  private switchPlayer(): void {
    if (this.currentPlayer === this.initialPlayer) {
      this.currentPlayer = this.initialPlayer === 'X' ? 'O' : 'X';
    } else {
      this.currentPlayer = this.initialPlayer;
    }
  }

  private isBoardFull(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== ''));
  }

  private checkWin(): boolean {
    const winLines = this.generateWinLines();
    for (const line of winLines) {
      if (line.every(([x, y]) => this.board[x][y] === this.currentPlayer)) {
        this.winningLine = line;
        return true;
      }
    }
    return false;
  }


  private generateWinLines(): number[][][] {
    const lines: number[][][] = [];
    for (let i = 0; i < this.gridSize; i++) {
      lines.push(Array.from({ length: this.gridSize }, (_, j) => [i, j]));
      lines.push(Array.from({ length: this.gridSize }, (_, j) => [j, i]));
    }
    lines.push(Array.from({ length: this.gridSize }, (_, i) => [i, i]));
    lines.push(
      Array.from({ length: this.gridSize }, (_, i) => [
        i,
        this.gridSize - 1 - i,
      ])
    );
    return lines;
  }
}
