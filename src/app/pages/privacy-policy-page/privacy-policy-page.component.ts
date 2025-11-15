import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section class="privacy-policy-page">
      <div class="container">
        <div class="content" appScrollAnimation animationClass="fade-in-up">
          <h1 class="page-title">Privacy Policy</h1>

          <div class="policy-content">
            <p class="policy-text">
              JAW Capital Management does not sell, share, and otherwise disclose your personal information to third parties for their marketing purposes. We utilize security measures appropriate to the provision of our Website and/or Services, such as reasonable administrative, technical, personnel, and physical measures designed to: (a) safeguard personal information against loss, theft, unauthorized use, disclosure, or modification; and (b) ensure the integrity of personal information.
            </p>

            <p class="policy-text">
              We may disclose your information to members of our organization, to our third party business partners, business associates, or subcontractors, and/or to other third parties for the purposes set out below:
            </p>

            <div class="policy-section">
              <h2 class="section-title">Within JAW Capital Management and to our third party service providers</h2>
              <p class="policy-text">
                We may disclose your personal information to third parties, including our affiliates, subcontractors, agents and any person who provides technical, professional, legal, tax or accounting advice or other services to us. All such third parties are required to maintain the security of such information to the extent they receive it.
              </p>
            </div>

            <div class="policy-section">
              <h2 class="section-title">Legal reasons</h2>
              <p class="policy-text">
                We may disclose your personal information or any portions thereof: (a) as required by, or to comply with, applicable law, rule, regulation, court process or other statutory requirement or to enforce our legal rights or agreements with you or others; (b) to respond to requests from any regulatory, supervisory or governmental authorities; (c) to defend ourselves from legal claims, or (d) where we have reason to believe that someone is causing injury to or interference with our rights or property, other users of our Website or Services, or anyone else that could be harmed by such activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .privacy-policy-page {
      background: var(--bg-primary);
      padding: 120px 24px 80px;
      min-height: calc(100vh - 200px);
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .content {
      background: var(--bg-secondary);
      padding: 60px;
      border-radius: 12px;
      box-shadow: var(--shadow-md);
    }

    .page-title {
      font-size: 48px;
      font-weight: 300;
      margin: 0 0 40px 0;
      color: var(--text-primary);
      letter-spacing: -0.5px;
    }

    .policy-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .policy-text {
      font-size: 16px;
      line-height: 1.8;
      margin: 0;
      color: var(--text-secondary);
      text-align: justify;
    }

    .policy-section {
      margin-top: 16px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 16px 0;
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .privacy-policy-page {
        padding: 100px 24px 60px;
      }

      .container {
        padding: 0 20px;
      }

      .content {
        padding: 40px 32px;
      }

      .page-title {
        font-size: 36px;
      }

      .section-title {
        font-size: 20px;
      }

      .policy-text {
        font-size: 15px;
        text-align: left;
      }
    }

    @media (max-width: 480px) {
      .content {
        padding: 32px 24px;
      }

      .page-title {
        font-size: 28px;
        margin-bottom: 32px;
      }
    }
  `]
})
export class PrivacyPolicyPageComponent {}
