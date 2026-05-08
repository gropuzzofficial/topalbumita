import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsService } from './services/albums';
import { PodioComponent } from './components/podio/podio';
import { ListaComponent } from './components/lista/lista';
import { Album, MESI } from './models/album.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PodioComponent, ListaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
  classificaAnnuale: Album[] = [];
  albumiPerMese: Record<number, Album[]> = {};
  mesiDisponibili: number[] = [];
  meseSelezionato: number | null = null;
  sezioneAttiva: 'mensile' | 'annuale' = 'annuale';
  MESI = MESI;

  constructor(
    private albumsService: AlbumsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.albumsService.getClassificaAnnuale().subscribe((albums: Album[]) => {
      this.classificaAnnuale = [...albums];
      this.cdr.detectChanges();
    });

    this.albumsService.getMesiDisponibili().subscribe((mesi: number[]) => {
      this.mesiDisponibili = [...mesi];
      if (mesi.length > 0) {
        const ultimoMese = mesi[mesi.length - 1];
        this.meseSelezionato = ultimoMese;
        this.albumsService.getAlbumsPerMese(ultimoMese).subscribe((albums: Album[]) => {
          this.albumiPerMese = { ...this.albumiPerMese, [ultimoMese]: [...albums] };
          this.cdr.detectChanges();
        });
      }
      this.cdr.detectChanges();
    });
  }

  caricaMese(mese: number): void {
    this.meseSelezionato = mese;
    if (!this.albumiPerMese[mese]) {
      this.albumsService.getAlbumsPerMese(mese).subscribe((albums: Album[]) => {
        this.albumiPerMese = { ...this.albumiPerMese, [mese]: [...albums] };
        this.cdr.detectChanges();
      });
    } else {
      this.cdr.detectChanges();
    }
  }

  selezionaSezione(s: 'mensile' | 'annuale'): void {
    this.sezioneAttiva = s;
    this.cdr.detectChanges();
  }

  get albumsMeseSelezionato(): Album[] {
    if (this.meseSelezionato === null) return [];
    return this.albumiPerMese[this.meseSelezionato] ?? [];
  }

  get podioPrimi(): Album[] { return this.classificaAnnuale.slice(0, 3); }
  get listaResto(): Album[] { return this.classificaAnnuale.slice(3); }
  get podioPrimiMese(): Album[] { return this.albumsMeseSelezionato.slice(0, 3); }
  get listaRestoMese(): Album[] { return this.albumsMeseSelezionato.slice(3); }
}