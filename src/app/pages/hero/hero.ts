import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Constants } from '../../core/constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [
    CommonModule,
    TranslateModule 
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('hero') hero!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('handsTogether') handsTogether!: ElementRef;
  // @ViewChild('meetTheCouple') meetTheCouple!: ElementRef;
  @ViewChild('meetTheBride') meetTheBride!: ElementRef;
  @ViewChild('meetTheGroom') meetTheGroom!: ElementRef;
  @ViewChild('memoriesSS') memoriesSS!: ElementRef;
  @ViewChild('eventsTemp') eventsTemp!: ElementRef;
  @ViewChild('thingsToKnow') thingsToKnow!: ElementRef;

  @Input() selectedlanguage!: string;

  isparrallaxVisible = true;
  initLoading = true;

  images = [
    'images/personal/t-j-4.jpeg',
    'images/personal/t-j-1.jpeg',
    'images/personal/traditional.jpeg',
    'images/personal/t-j-3.jpeg',
    'images/personal/download-8.jpeg',
    'images/personal/t-j-2.jpeg',
    'images/personal/tdp.jpeg',
    'images/personal/11-11.jpeg',
  ];
  currentIndex = 0;
  ssInterval: any;
  wedTitleInterval: any;
  touchStartX = 0;
  touchEndX = 0;

  bgPosition = '';
  glImg = 'images/ganesha.png';
  weddingDate = new Date('2026-05-01T00:00:00+05:30');
  countdown: any;
  i18nLabels = Constants.i18nLabel;
  gujLang = Constants.guj;
  private ticking = false;
  elements: HTMLElement[] = [];
  showBrideText = false;
  showGroomText = false;

  constructor(
    private translate: TranslateService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.weddingDate.setHours(this.weddingDate.getHours() + 10);
    this.setCountdown();
  }

  ngAfterViewInit(): void {
    this.startSlideshow();
    this.ngZone.runOutsideAngular(() => {
      this.initParallax();
    });
    this.initLoading = true;
    setTimeout(() => {
      this.initLoading = false;
    }, 1000);
  }

  initParallax() {
  gsap.to('.bg-layer', {
    y: 0,
    scrollTrigger: {
      trigger: '.scene',
      scrub: true
    }
  });

  gsap.to('.front-layer', {
    y: -200,
    scrollTrigger: {
      trigger: '.scene',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    }
  });
}

  ngOnDestroy() {
    clearInterval(this.wedTitleInterval);
    clearInterval(this.ssInterval);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  startSlideshow() {
    this.ssInterval = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    }, 5000);
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

onTouchStart(event: TouchEvent) {
  this.touchStartX = event.changedTouches[0].screenX;
}

onTouchEnd(event: TouchEvent) {
  this.touchEndX = event.changedTouches[0].screenX;
  this.handleSwipe();
}

handleSwipe() {
  const swipeDistance = this.touchStartX - this.touchEndX;

  if (swipeDistance > 50) {
    this.next();
  }

  if (swipeDistance < -50) {
    this.prev();
  }
}

  setCountdown() {
    setInterval(() => {
      let diff = this.weddingDate.getTime() - new Date().getTime();
      diff = diff < 0 ? 0 : diff;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      this.countdown = {
        days,
        hours,
        minutes,
        seconds
      } 
    }, 1000);
  }

  onVenueClick() {
    window.open("https://maps.app.goo.gl/jkqGjUc2i17r7ApJA")
  }
  
}
