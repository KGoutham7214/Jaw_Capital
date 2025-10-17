import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="results" class="results">
      <div class="container">
        <h2 class="section-title">{{ t().results.title }}</h2>
        <p class="subtitle">
          Our system is built around flexibility. By using a mix of proven strategies, technical indicators, and a hedge position.
        </p>

        <div class="timeline" role="list">
          <div
            *ngFor="let item of timelineItems"
            class="timeline-item"
            [class.expanded]="item.expanded"
            role="listitem"
          >
            <div class="timeline-header">
              <div
                class="image-placeholder"
                [class.expanded-image]="item.expanded"
                role="img"
                [attr.aria-label]="'Chart for ' + item.year"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 120 120"
                  aria-hidden="true"
                  class="chart-svg"
                >
                  <rect width="120" height="120" fill="#b8c5e0" rx="8"/>
                  <g transform="translate(30, 60)">
                    <rect x="0" y="10" width="15" height="30" fill="white" opacity="0.6"/>
                    <rect x="20" y="20" width="15" height="20" fill="white" opacity="0.6"/>
                    <rect x="40" y="5" width="15" height="35" fill="white" opacity="0.6"/>
                  </g>
                </svg>
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
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 32px;
      font-weight: 400;
      margin: 0 0 16px 0;
      color: #1a1a1a;
    }

    .subtitle {
      font-size: 14px;
      color: #4a4a4a;
      margin: 0 0 48px 0;
      max-width: 700px;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .timeline-item {
      border-bottom: 1px solid #e0e0e0;
      transition: all 0.3s;
    }

    .timeline-header {
      display: flex;
      align-items: center;
      gap: 32px;
      padding: 24px 0;
      cursor: pointer;
    }

    .image-placeholder {
      width: 120px;
      height: 120px;
      background: #f5f7fa;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.4s ease;
      overflow: hidden;
    }

    .image-placeholder.expanded-image {
      width: 140px;
      height: 140px;
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
      font-size: 32px;
      font-weight: 400;
      color: #1a1a1a;
      margin: 0 0 4px 0;
    }

    .category {
      font-size: 16px;
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
      padding: 0 0 24px 152px;
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
      background: #2952cc;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .point-text {
      margin: 0;
      flex: 1;
      color: #4a4a4a;
      font-size: 14px;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .timeline-header {
        gap: 16px;
        padding: 20px 0;
      }

      .image-placeholder {
        width: 80px;
        height: 80px;
      }

      .image-placeholder.expanded-image {
        width: 100px;
        height: 100px;
      }

      .year {
        font-size: 24px;
      }

      .category {
        font-size: 14px;
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
