import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Hero } from './pages/hero/hero';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Constants } from './core/constants';

@Component({
  selector: 'app-root',
  imports: [
    Hero,
    CommonModule,
    TranslateModule   // ✅ THIS IS REQUIRED
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('jay-ke-dil-ki-toral');
  audioSrc = 'audio/Wedding_Piano_Music.mp3';
  isPlaying = false;
  isLoaded = false;

  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
  // this.translate.setDefaultLang('en');
  //   this.translate.use('en'); // 🔥 force first load
  }

  ngOnInit(): void {
    this.isLoaded = false;
    setTimeout(() => {
     this.isLoaded = true; 
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url; // e.g. /en
        const lang = url.split('/')[1] || 'en';
        this.translate.use(
          Constants.allowedLangs.includes(lang) ? lang : 'en'
        );
      });
  }
  switchLang(lang: string) {
    this.router.navigate(['/', lang]);
  }
  toggleMusic() {
    const audio = this.bgMusic.nativeElement;

    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    this.isPlaying = !this.isPlaying;
  }
}
