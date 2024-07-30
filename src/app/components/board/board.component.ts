import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BoardComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

  makeMove(row: number, col: number): void {
    this.gameService.makeMove(row, col);
  }
}
