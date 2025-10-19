import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">{{ t().about.title }}</h2>
        <p class="description">
          {{ t().about.description }}
        </p>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background: white;
      padding: 80px 24px;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
    }

    .section-title {
      font-size: clamp(28px, 3vw, 48px);
      font-weight: 400;
      margin: 0 0 32px 0;
      color: #1a1a1a;
    }

    .description {
      font-size: clamp(16px, 1.3vw, 20px);
      line-height: 1.8;
      color: #4a4a4a;
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
