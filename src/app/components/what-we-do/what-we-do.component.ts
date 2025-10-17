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
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 28px;
      font-weight: 400;
      margin: 0 0 24px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .arrow {
      font-size: 24px;
    }

    .description {
      font-size: 16px;
      line-height: 1.8;
      margin: 0;
      max-width: 900px;
      opacity: 0.95;
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 24px;
      }

      .description {
        font-size: 15px;
      }
    }
  `]
})
export class WhatWeDoComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);
}
