import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section id="about" class="about">
      <div class="overlay"></div>
      <div class="container">
        <h2 class="section-title" appScrollAnimation animationClass="fade-in-up">{{ t().about.title }}</h2>
        <p class="description" appScrollAnimation animationClass="fade-in-up" [animationDelay]="100">
          {{ t().about.description }}
        </p>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background: var(--bg-secondary);
      padding: 80px 24px;
      position: relative;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(41, 82, 204, 0.03) 0%, rgba(255, 255, 255, 0.05) 100%);
      pointer-events: none;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
      position: relative;
      z-index: 1;
    }

    .section-title {
      font-size: clamp(28px, 3vw, 48px);
      font-weight: 400;
      margin: 0 0 32px 0;
      color: var(--text-primary);
    }

    .description {
      font-size: clamp(16px, 1.3vw, 20px);
      line-height: 1.8;
      color: var(--text-secondary);
      margin: 0;
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }
    }
  `]
})
export class AboutComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);
}
