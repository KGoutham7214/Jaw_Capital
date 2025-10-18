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
          </div>

          <nav class="footer-links" aria-label="Footer navigation">
            <h3 class="footer-heading">Navigation</h3>
            <a href="#what-we-do">{{ t().header.whatWeDo }}</a>
            <a href="#about">{{ t().header.aboutUs }}</a>
            <a href="#results">{{ t().header.results }}</a>
            <a href="#contact">{{ t().header.contactUs }}</a>
          </nav>

          <div class="footer-contact">
            <h3 class="footer-heading">Contact</h3>
            <a href="tel:+1234567890" class="contact-link">{{ t().footer.phoneNumber }}</a>
            <a href="mailto:info@jaw.com" class="contact-link">{{ t().footer.email }}</a>
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
      background: #0f172a;
      color: white;
      padding: 80px 24px 32px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 80px;
      margin-bottom: 60px;
      padding-bottom: 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .logo {
      font-weight: 600;
      font-size: 28px;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .tagline {
      font-size: 15px;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
      max-width: 350px;
    }

    .footer-heading {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin: 0 0 20px 0;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 15px;
      font-weight: 400;
      transition: color 0.3s;
    }

    .footer-links a:hover {
      color: white;
    }

    .footer-links a:focus-visible,
    .contact-link:focus-visible {
      outline: 2px solid white;
      outline-offset: 4px;
      border-radius: 2px;
    }

    .footer-contact {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .contact-link {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 15px;
      transition: color 0.3s;
    }

    .contact-link:hover {
      color: white;
    }

    .footer-bottom {
      padding-top: 32px;
    }

    .footer-bottom p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      margin: 0;
      text-align: center;
      font-weight: 400;
    }

    @media (max-width: 968px) {
      .footer-content {
        grid-template-columns: 2fr 1fr;
        gap: 60px;
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding: 60px 24px 32px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
        margin-bottom: 40px;
        padding-bottom: 32px;
      }

      .tagline {
        max-width: 100%;
      }
    }
  `]
})
export class FooterComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);
}
