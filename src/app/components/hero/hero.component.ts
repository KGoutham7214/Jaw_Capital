import { Component, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section class="hero">
      <video #heroVideo class="hero-video" muted loop playsinline [attr.autoplay]="true">
        <source src="assets/videos/bgvideo2.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="container">
        <h1 class="title" appScrollAnimation animationClass="fade-in-up">
          {{ t().hero.title.split('\\n')[0] }}<br>
          {{ t().hero.title.split('\\n')[1] }}
        </h1>
        <p class="subtitle" appScrollAnimation animationClass="fade-in-up" [animationDelay]="100">
          {{ t().hero.subtitle }}
        </p>
        <button class="cta-button" type="button" (click)="navigateToContact()" appScrollAnimation animationClass="fade-in-up" [animationDelay]="200">{{ t().hero.ctaButton }}</button>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 120px 24px 160px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-video {
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
      z-index: 0;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
      position: relative;
      z-index: 2;
    }

    .title {
      font-size: clamp(36px, 5vw, 72px);
      font-weight: 400;
      line-height: 1.2;
      margin: 0 0 32px 0;
      color: #ffffff;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: clamp(16px, 1.5vw, 22px);
      line-height: 1.6;
      color: #f0f0f0;
      margin: 0 auto 40px;
    }

    .cta-button {
      background: #2952cc;
      color: #ffffff;
      border: none;
      padding: 16px 48px;
      font-size: clamp(14px, 1.2vw, 18px);
      font-weight: 500;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .cta-button:hover {
      background: #1e3a8a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(41, 82, 204, 0.4);
    }

    .cta-button:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }

      .hero {
        padding: 60px 24px 80px;
      }
    }
  `]
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  private languageService = inject(LanguageService);
  private router = inject(Router);
  t = this.languageService.getTranslations.bind(this.languageService);

  ngAfterViewInit() {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true;
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
