import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-over-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over-modal.component.html',
  styleUrls: ['./game-over-modal.component.css'],
})
export class GameOverModalComponent {
  @Input() winner!: string | null;
  @Output() replay = new EventEmitter<void>();

  onReplayClick(): void {
    this.replay.emit();
  }
}
