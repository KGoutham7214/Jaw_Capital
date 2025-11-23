import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { FeeStructureComponent } from '../../components/fee-structure/fee-structure.component';
import { WhyDifferentComponent } from '../../components/why-different/why-different.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-what-we-do-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollAnimationDirective, FeeStructureComponent, WhyDifferentComponent],
  template: `
    <section class="what-we-do-page" appScrollAnimation animationClass="fade-in">
      <div class="container">
        <div class="content-grid">
          <div class="text-content">
            <h1 class="page-title">{{ t().whatWeDoPage.title }}</h1>
            <div class="description-block">
              <p class="description">
                {{ t().whatWeDoPage.description1 }}
              </p>
            </div>
            <div class="description-block">
              <p class="description">
                {{ t().whatWeDoPage.description2 }}
              </p>
            </div>
          </div>

          <div class="image-carousel">
            <div class="carousel-container">
              <div class="carousel-images">
                <div
                  *ngFor="let image of carouselImages; let i = index"
                  class="carousel-image"
                  [class.active]="currentImageIndex() === i"
                >
                  <img [src]="image.src" [alt]="image.label" class="carousel-img">
                </div>
              </div>
              <div class="carousel-dots">
                <button
                  *ngFor="let image of carouselImages; let i = index"
                  class="dot"
                  [class.active]="currentImageIndex() === i"
                  (click)="goToSlide(i)"
                  [attr.aria-label]="'Go to slide ' + (i + 1)"
                  type="button"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div appScrollAnimation animationClass="fade-in-up">
      <app-fee-structure></app-fee-structure>
    </div>
    <div appScrollAnimation animationClass="fade-in-up">
      <app-why-different></app-why-different>
    </div>
  `,
  styles: [`
    .what-we-do-page {
      background: var(--bg-secondary);
      padding: 120px 24px 80px;
      min-height: calc(100vh - 200px);
      position: relative;
    }

    .what-we-do-page::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    .container {
      margin: 0 auto;
      padding: 0 40px;
      position: relative;
      z-index: 1;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: start;
    }

    .text-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-title {
      font-size: 40px;
      font-weight: 400;
      margin: 0;
      color: var(--text-primary);
    }

    .description-block {
      margin: 0;
    }

    .description {
      font-size: 14px;
      line-height: 1.8;
      margin: 0;
      color: var(--text-secondary);
      text-align: justify;
    }

    .image-carousel {
      position: relative;
    }

    .carousel-container {
      position: relative;
      width: 100%;
    }

    .carousel-images {
      position: relative;
      width: 100%;
      height: 400px;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
    }

    .carousel-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .carousel-image.active {
      opacity: 1;
    }

    .carousel-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 16px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--border-color);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: all 0.3s;
    }

    .dot:hover {
      background: var(--text-muted);
    }

    .dot.active {
      background: var(--text-primary);
      width: 12px;
      height: 12px;
    }

    .dot:focus-visible {
      outline: 2px solid var(--accent-primary);
      outline-offset: 4px;
    }

    @media (max-width: 968px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .carousel-images {
        height: 300px;
      }
    }

    @media (max-width: 768px) {
      .what-we-do-page {
        padding: 100px 24px 60px;
      }

      .page-title {
        font-size: 32px;
      }

      .description {
        font-size: 15px;
        text-align: left;
      }

      .carousel-images {
        height: 250px;
      }
    }
  `]
})
export class WhatWeDoPageComponent {
  private languageService = inject(LanguageService);

  currentImageIndex = signal(0);
  t = computed(() => this.languageService.getTranslations());

  carouselImages = [
    { label: 'Office Building', src: 'assets/what-we-do/building.jpg' },
    { label: 'Conference Room', src: 'assets/what-we-do/conf_gem.png' },
    { label: 'Satellite', src: 'assets/what-we-do/satellite.jpg' }
  ];

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentImageIndex.update(i => (i + 1) % this.carouselImages.length);
  }

  goToSlide(index: number) {
    this.currentImageIndex.set(index);
  }
}
