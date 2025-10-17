import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="logo" aria-label="JAW Logo">JAW</div>
            <p class="tagline">
              {{ t().footer.tagline }}
            </p>
            <nav class="social-links" [attr.aria-label]="t().ariaLabels.socialMedia">
              <a href="#" [attr.aria-label]="t().ariaLabels.linkedin">in</a>
              <a href="#" [attr.aria-label]="t().ariaLabels.facebook">f</a>
              <a href="#" [attr.aria-label]="t().ariaLabels.twitter">𝕏</a>
              <a href="#" [attr.aria-label]="t().ariaLabels.instagram">📷</a>
            </nav>
          </div>

          <nav class="footer-links" aria-label="Footer navigation">
            <div class="link-group">
              <a href="#what-we-do"><span aria-hidden="true">↗ </span>{{ t().header.whatWeDo.toUpperCase() }}</a>
            </div>
            <div class="link-group">
              <a href="#about"><span aria-hidden="true">↗ </span>{{ t().header.aboutUs.toUpperCase() }}</a>
            </div>
            <div class="link-group">
              <a href="#results"><span aria-hidden="true">↗ </span>{{ t().header.results.toUpperCase() }}</a>
            </div>
            <div class="link-group">
              <a href="#contact"><span aria-hidden="true">↗ </span>{{ t().header.contactUs.toUpperCase() }}</a>
            </div>
          </nav>

          <div class="footer-contact">
            <div class="contact-item">
              <span class="icon" aria-hidden="true">📞</span>
              <span>{{ t().footer.phoneNumber }}</span>
            </div>
            <div class="contact-item">
              <span class="icon" aria-hidden="true">✉️</span>
              <span>{{ t().footer.email }}</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>{{ t().footer.copyright }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1e3a8a;
      color: white;
      padding: 60px 24px 24px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .logo {
      font-weight: 700;
      font-size: 20px;
      letter-spacing: 0.5px;
    }

    .tagline {
      font-size: 14px;
      line-height: 1.6;
      opacity: 0.9;
      margin: 0;
    }

    .social-links {
      display: flex;
      gap: 16px;
      margin-top: 8px;
    }

    .social-links a {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: all 0.3s;
    }

    .social-links a:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .social-links a:focus-visible,
    .link-group a:focus-visible {
      outline: 2px solid white;
      outline-offset: 4px;
      border-radius: 4px;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .link-group a {
      color: white;
      text-decoration: none;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition: opacity 0.3s;
    }

    .link-group a:hover {
      opacity: 0.8;
    }

    .footer-contact {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .icon {
      font-size: 16px;
    }

    .footer-bottom {
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .footer-bottom p {
      font-size: 12px;
      opacity: 0.7;
      margin: 0;
      text-align: center;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }
  `]
})
export class FooterComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);
}
