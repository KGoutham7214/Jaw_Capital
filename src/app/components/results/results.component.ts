import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section id="results" class="results">
      <div class="container">
        <h2 class="section-title" appScrollAnimation animationClass="fade-in-up">{{ t().results.title }}</h2>
        <p class="subtitle" appScrollAnimation animationClass="fade-in-up" [animationDelay]="100">
          Our system is built around flexibility. By using a mix of proven strategies, technical indicators, and a hedge position.
        </p>

        <div class="timeline" role="list">
          <div
            *ngFor="let item of timelineItems; let i = index"
            class="timeline-item"
            [class.expanded]="item.expanded"
            role="listitem"
            appScrollAnimation
            animationClass="fade-in-up"
            [animationDelay]="200 + (i * 100)"
          >
            <div class="timeline-header">
              <div
                class="image-placeholder"
                [class.expanded-image]="item.expanded"
                role="img"
                [attr.aria-label]="'Chart for ' + item.year"
                [style.background-image]="'url(' + item.image + ')'"
              >
              </div>

              <div class="timeline-content" (click)="toggleExpand(item)">
                <div class="timeline-info">
                  <h3 class="year">{{ item.year }}</h3>
                  <p class="category">{{ t().results.corporateAdvisory }}</p>
                </div>
                <button
                  class="expand-btn"
                  [attr.aria-label]="item.expanded ? t().ariaLabels.collapseDetails : t().ariaLabels.expandDetails"
                  [attr.aria-expanded]="item.expanded"
                  type="button"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class.rotated]="item.expanded">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="details" *ngIf="item.expanded" role="region">
              <div class="details-grid">
                <div class="detail-point" *ngFor="let point of item.details">
                  <div class="point-icon">✓</div>
                  <p class="point-text">{{ point }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .results {
      background: white;
      padding: 80px 24px 20px 24px;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
    }

    .section-title {
      font-size: clamp(28px, 3vw, 48px);
      font-weight: 400;
      margin: 0 0 24px 0;
      color: #1a1a1a;
    }

    .subtitle {
      font-size: clamp(14px, 1.2vw, 18px);
      color: #4a4a4a;
      margin: 0 0 56px 0;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .timeline-item {
      transition: all 0.3s;
      background: white;
      margin-bottom: 8px;
      border-radius: 8px;
    }

    .timeline-item:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transform: translateX(4px);
    }

    .timeline-header {
      display: flex;
      align-items: center;
      gap: 32px;
      padding: 24px 0;
      cursor: pointer;
    }

    .image-placeholder {
      width: clamp(120px, 10vw, 160px);
      height: clamp(120px, 10vw, 160px);
      background: linear-gradient(135deg, rgba(41, 82, 204, 0.1) 0%, rgba(30, 58, 138, 0.1) 100%);
      background-size: cover;
      background-position: center;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.4s ease;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .timeline-item:hover .image-placeholder {
      transform: scale(1.05) rotate(2deg);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    }

    .image-placeholder.expanded-image {
      width: clamp(140px, 11vw, 180px);
      height: clamp(140px, 11vw, 180px);
      transform: scale(1.05);
    }

    .chart-svg {
      transition: all 0.4s ease;
    }

    .timeline-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      cursor: pointer;
    }

    .timeline-info {
      flex: 1;
    }

    .year {
      font-size: clamp(28px, 2.5vw, 42px);
      font-weight: 400;
      color: #1a1a1a;
      margin: 0 0 8px 0;
    }

    .category {
      font-size: clamp(14px, 1.2vw, 20px);
      color: #1a1a1a;
      margin: 0;
    }

    .expand-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: #1a1a1a;
      transition: all 0.3s;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
    }

    .expand-btn svg {
      transition: transform 0.3s ease;
    }

    .expand-btn svg.rotated {
      transform: rotate(180deg);
    }

    .expand-btn:hover {
      background: #f0f0f0;
    }

    .expand-btn:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 2px;
    }

    .details {
      padding: 0 0 24px 203px;
      color: #4a4a4a;
      font-size: 14px;
      line-height: 1.6;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .detail-point {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .point-icon {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
      margin-top: 2px;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    .point-text {
      margin: 0;
      flex: 1;
      color: #4a4a4a;
      font-size: clamp(14px, 1.1vw, 17px);
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }

      .timeline-header {
        gap: 16px;
        padding: 20px 0;
      }

      .details {
        padding: 0 0 20px 0;
      }

      .details-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `]
})
export class ResultsComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);

  timelineItems = [
    {
      year: '2023',
      image: 'https://images.pexels.com/photos/8297031/pexels-photo-8297031.jpeg?auto=compress&cs=tinysrgb&w=400',
      expanded: false,
      details: [
        'Achieved 127% return on investment through strategic market positioning and risk management',
        'Successfully managed portfolio diversification across multiple asset classes and sectors',
        'Implemented advanced technical analysis systems resulting in improved entry and exit timing',
        'Maintained consistent performance with minimal drawdown during market volatility'
      ]
    },
    {
      year: '2024',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
      expanded: false,
      details: [
        'Delivered 145% ROI by leveraging emerging market opportunities and trend analysis',
        'Enhanced risk management protocols leading to better capital preservation',
        'Utilized proprietary trading algorithms for optimal trade execution and efficiency',
        'Expanded portfolio strategies to include options and futures for hedging purposes'
      ]
    },
    {
      year: '2025',
      image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
      expanded: false,
      details: [
        'Targeting 150%+ returns through refined strategies and market intelligence',
        'Integrating AI-powered analytics for enhanced decision-making and pattern recognition',
        'Focusing on sustainable growth with improved risk-adjusted returns',
        'Developing advanced hedging techniques to protect capital in varying market conditions'
      ]
    }
  ];

  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  }
}
