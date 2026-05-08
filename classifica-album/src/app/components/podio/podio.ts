import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-podio',
  standalone: true,
  imports: [CommonModule],
templateUrl: './podio.html',
styleUrls: ['./podio.scss'],
})
export class PodioComponent implements OnChanges {
  @Input() albums: Album[] = [];

  primo: Album | null = null;
  secondo: Album | null = null;
  terzo: Album | null = null;

  ngOnChanges(): void {
    this.primo = this.albums[0] ?? null;
    this.secondo = this.albums[1] ?? null;
    this.terzo = this.albums[2] ?? null;
  }

  getVotoLabel(voto: number): string {
    return voto.toFixed(1);
  }
}