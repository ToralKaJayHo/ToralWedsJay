import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Constants } from '../../core/constants';

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

  isparrallaxVisible = true;

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

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.weddingDate.setHours(this.weddingDate.getHours() + 10);
    this.setCountdown();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateHeight(); 
    });
    this.startSlideshow();
    // this.setHeartbeatToFonts();
  }

  ngOnDestroy() {
    clearInterval(this.wedTitleInterval);
    clearInterval(this.ssInterval);
  }

  @HostListener('window:load')
  @HostListener('window:resize')
  @HostListener('document:DOMContentLoaded')
  @HostListener('window:orientationchange')
  @HostListener('window:scroll')
  updateHeight() {

    this.hero.nativeElement.style.height = this.hero.nativeElement.offsetWidth + 'px';
    // this.handsTogether.nativeElement.style.height = this.handsTogether.nativeElement.offsetWidth/1.5 + 'px';
    this.meetTheBride.nativeElement.style.height = this.meetTheBride.nativeElement.offsetWidth/1.4 + 'px';
    this.meetTheGroom.nativeElement.style.height = this.meetTheGroom.nativeElement.offsetWidth/1.4 + 'px';
    
    this.content.nativeElement.style.minWidth = (this.hero.nativeElement.offsetWidth -1) + 'px';
    const rect = this.content.nativeElement.getBoundingClientRect();

    this.isparrallaxVisible = rect.top < window.innerHeight && rect.bottom >= 300;
    if (this.isparrallaxVisible) {
      this.setbgPositionAndScroll();
    }
  }

  setHeartbeatToFonts() {
    // this.wedTitleInterval = setInterval(() => {
    const wedTitle = document.querySelector('.wed-title') as HTMLElement;
    let margin = window.innerHeight;
    let factor = window.innerHeight;
    if(window.innerHeight < window.innerWidth) {
      factor = window.innerHeight / window.innerWidth;
      margin = window.innerHeight;
    } else if(window.innerHeight = window.innerWidth) {
      margin = window.innerHeight;
      factor = 0.7;
    } else {
      factor = window.innerHeight / window.innerWidth ;
      margin = window.innerHeight;
    }
    wedTitle.style.minHeight = factor * margin + 'px' ;
      // if(wedTitle.style.fontSize === '5rem') {
      //   wedTitle.style.fontSize = '6rem';
      // } else {
      //   wedTitle.style.fontSize = '5rem'
      // }
    // }, 1160);
  }

  setbgPositionAndScroll() {
    const factorScx = window.innerWidth < 768 ? 0.75 : 0.3;
    let y =  0;
    if (window.scrollY > 300) {
      // subtract start point so it starts from 0 smoothly
      y = (window.scrollY - 300) * factorScx;
    }
    [
      document.querySelector('.root-landing-img') as HTMLElement,
      document.querySelector('.hands-together-img') as HTMLElement,
      document.querySelector('.meet-bride-img') as HTMLElement,
      document.querySelector('.meet-groom-img') as HTMLElement,
      document.querySelector('.memories-container') as HTMLElement,
      document.querySelector('.events-container') as HTMLElement,
    ].forEach(bg=> {
      bg.style.transform = `translateY(${y}px)`;
    })
    setTimeout(() => {
      const gtlPO = document.querySelector('.gtl-po') as HTMLElement;
      gtlPO.style.marginTop = '0';
    }, 1000);

    // console.log(this.hero.nativeElement.getBoundingClientRect());
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
