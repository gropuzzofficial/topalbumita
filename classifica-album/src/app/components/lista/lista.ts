import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
templateUrl: './lista.html',
styleUrls: ['./lista.scss'],
})
export class ListaComponent {
  @Input() albums: Album[] = [];
  @Input() offset: number = 3; // start rank from this (skip podium top 3)

  getVotoLabel(voto: number): string {
    return voto.toFixed(1);
  }

  getVotoClass(voto: number): string {
    if (voto >= 9) return 'voto-top';
    if (voto >= 8) return 'voto-high';
    if (voto >= 7) return 'voto-mid';
    return 'voto-low';
  }
}