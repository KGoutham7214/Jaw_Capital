import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section class="hero">
      <div class="container">
        <h1 class="title" appScrollAnimation animationClass="fade-in-up">
          {{ t().hero.title.split('\\n')[0] }}<br>
          {{ t().hero.title.split('\\n')[1] }}
        </h1>
        <p class="subtitle" appScrollAnimation animationClass="fade-in-up" [animationDelay]="100">
          {{ t().hero.subtitle }}
        </p>
        <button class="cta-button" type="button" appScrollAnimation animationClass="fade-in-up" [animationDelay]="200">{{ t().hero.ctaButton }}</button>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: white;
      padding: 80px 24px 120px;
      text-align: center;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .title {
      font-size: 48px;
      font-weight: 400;
      line-height: 1.2;
      margin: 0 0 24px 0;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 16px;
      line-height: 1.6;
      color: #4a4a4a;
      margin: 0 0 32px 0;
    }

    .cta-button {
      background: white;
      color: #1a1a1a;
      border: 1px solid #d0d0d0;
      padding: 12px 32px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s;
    }

    .cta-button:hover {
      border-color: #2952cc;
      color: #2952cc;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(41, 82, 204, 0.15);
    }

    .cta-button:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
    }

    @media (max-width: 768px) {
      .title {
        font-size: 36px;
      }

      .hero {
        padding: 60px 24px 80px;
      }
    }
  `]
})
export class HeroComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);
}
