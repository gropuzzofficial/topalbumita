import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  private cache: Album[] | null = null;

  private fetchAlbums(): Observable<Album[]> {
    if (this.cache) return from(Promise.resolve(this.cache));
    return from(
      fetch('assets/albums.json')
        .then(r => r.json())
        .then((data: Album[]) => {
          this.cache = data;
          return data;
        })
    );
  }

  getAlbums(): Observable<Album[]> {
    return this.fetchAlbums().pipe(
      map(albums => albums.filter(a => !a.nascosto))
    );
  }

  getAlbumsPerMese(mese: number): Observable<Album[]> {
    return this.getAlbums().pipe(
      map(albums => albums.filter(a => a.mese === mese).sort((a, b) => b.voto - a.voto))
    );
  }

  getClassificaAnnuale(): Observable<Album[]> {
    return this.getAlbums().pipe(
      map(albums => [...albums].sort((a, b) => b.voto - a.voto))
    );
  }

  getMesiDisponibili(): Observable<number[]> {
    return this.getAlbums().pipe(
      map(albums => [...new Set(albums.map(a => a.mese))].sort((a, b) => a - b))
    );
  }
}