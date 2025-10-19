import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-what-we-do',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section id="what-we-do" class="what-we-do">
      <div class="container">
        <h2 class="section-title" appScrollAnimation animationClass="slide-in-left">
          {{ t().whatWeDo.title }} <span class="arrow" aria-hidden="true">↗</span>
        </h2>
        <p class="description" appScrollAnimation animationClass="slide-in-right" [animationDelay]="100">
          {{ t().whatWeDo.description }}
        </p>
      </div>
    </section>
  `,
  styles: [`
    .what-we-do {
      background: #2952cc;
      color: white;
      padding: 60px 24px;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
    }

    .section-title {
      font-size: clamp(24px, 2.5vw, 42px);
      font-weight: 400;
      margin: 0 0 32px 0;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .arrow {
      font-size: clamp(20px, 2vw, 32px);
    }

    .description {
      font-size: clamp(16px, 1.3vw, 20px);
      line-height: 1.8;
      margin: 0;
      opacity: 0.95;
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }
    }
  `]
})
export class WhatWeDoComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);
}
