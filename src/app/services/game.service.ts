import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private board: string[][] = [];
  private currentPlayer: 'X' | 'O' = 'X';
  private initialPlayer: 'X' | 'O' = 'X';
  private gameOver: boolean = false;
  private gridSize: number = 3; // Par défaut à 3x3
  private initialized: boolean = false;
  private winner: string | null = null;
  winningLine: number[][] = [];
  isAnimating: boolean = false;

  /**
   *   This method initializes the game with a new grid size
   *   and resets the game state
   */
  newGame(gridSize: number): void {
    this.gridSize = gridSize;
    this.board = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => '')
    );
    this.gameOver = false;
    this.initialized = true;
    this.winner = null;
    this.isAnimating = false;
    this.winningLine = [];
    this.currentPlayer = this.initialPlayer;
  }

  /**
   *   This method makes a move on the board
   *   @param row The row of the cell
   *   @param col The column of the cell
   *   @returns boolean
   *  Returns true if the move was successful, false otherwise
   * */
  makeMove(row: number, col: number): boolean {
    if (this.board[row][col] === '' && !this.gameOver) {
      this.isAnimating = true;
      this.board[row][col] = this.currentPlayer;
      if (this.checkWin()) {
        setTimeout(() => {
          this.gameOver = true;
          this.isAnimating = false;
          this.winner = this.currentPlayer;
        }, 1500);
      } else if (this.isBoardFull()) {
        setTimeout(() => {
          this.gameOver = true;
          this.isAnimating = false;
          this.winner = null; // Match nul
        }, 1500);
      } else {
        this.switchPlayer();
      }
      return true;
    }
    return false;
  }


  /**
   *   This method makes a random move on the board
   * */
  makeRandomMove(): void {
    const emptyCells: number[][] = this.board.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === '' ? [rowIndex, colIndex] : null))
    ).filter(Boolean) as number[][];

    if (emptyCells.length > 0) {
      const [row, col] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.makeMove(row, col);
    }
  }

  /**
   *  This method checks if a cell is part of the winning line
   * @param row The row of the cell
   * @param col The column of the cell
   * @returns boolean
   * Returns true if the cell is part of the winning line, false otherwise
   * */
  isWinningCell(row: number, col: number): boolean {
    return this.winningLine.some(([x, y]) => x === row && y === col);
  }

  /**
   * This method checks if the game is initialized
   **/
  isGameInitialized(): boolean {
    return this.initialized;
  }

  /**
   * This method returns the grid size
   **/
  getGridSize(): number {
    return this.gridSize;
  }

  /**
   * This method sets the player type
   * @param playerType The player type
   **/
  setPlayerType(playerType: 'X' | 'O'): void {
    this.initialPlayer = playerType;
    this.currentPlayer = playerType;
  }

  /**
   * This method sets the current player
   * @param playerType The player type
   * */
  setCurrentPlayer(playerType: 'X' | 'O'): void {
    this.currentPlayer = playerType;
  }

  /**
   * This method returns the current player
   * */
  getCurrentPlayer(): 'X' | 'O' {
    return this.currentPlayer;
  }

  /**
   * This method returns the initial player
   * */
  getInitialPlayer(): 'X' | 'O' {
    return this.initialPlayer;
  }

  /**
   * This method returns the board
   * */
  getBoard(): string[][] {
    return this.board;
  }

  /**
   * This method checks if the game is over
   * */
  isGameOver(): boolean {
    return this.gameOver;
  }

  /**
   * This method returns the winner
   * */
  getWinner(): string | null {
    return this.winner;
  }

    /**
   * This method checks if the board is full
   * */
    isBoardFull(): boolean {
      return this.board.every(row => row.every(cell => cell !== ''));
    }

  /**
   * This method switches the player
   * */
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  /**
   * This method checks if the current player has won
   * @returns boolean
   * Returns true if the current player has won, false otherwise
   * */
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

  /**
   * This method returns the winning line
   * @returns number[][][]
   * */
  private generateWinLines(): number[][][] {
    const lines: number[][][] = [];

    // Rows and columns
    for (let i = 0; i < this.gridSize; i++) {
      lines.push(Array.from({ length: this.gridSize }, (_, j) => [i, j]));
      lines.push(Array.from({ length: this.gridSize }, (_, j) => [j, i]));
    }

    // Diagonals
    lines.push(Array.from({ length: this.gridSize }, (_, i) => [i, i]));
    lines.push(Array.from({ length: this.gridSize }, (_, i) => [i, this.gridSize - 1 - i]));

    return lines;
  }
}
