import { Component, inject } from '@angular/core';
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
      background: white;
      padding: 80px 24px 120px;
      text-align: center;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
    }

    .title {
      font-size: clamp(36px, 5vw, 72px);
      font-weight: 400;
      line-height: 1.2;
      margin: 0 0 32px 0;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: clamp(16px, 1.5vw, 22px);
      line-height: 1.6;
      color: #4a4a4a;
      margin: 0 auto 40px;
    }

    .cta-button {
      background: white;
      color: #1a1a1a;
      border: 1px solid #d0d0d0;
      padding: 16px 48px;
      font-size: clamp(14px, 1.2vw, 18px);
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
      .container {
        padding: 0 24px;
      }

      .hero {
        padding: 60px 24px 80px;
      }
    }
  `]
})
export class HeroComponent {
  private languageService = inject(LanguageService);
  private router = inject(Router);
  t = this.languageService.getTranslations.bind(this.languageService);

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
