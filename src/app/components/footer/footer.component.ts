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
            <p class="description">
              Professional trading solutions designed to maximize your investment potential through proven strategies and cutting-edge technology.
            </p>
            <nav class="social-links" [attr.aria-label]="t().ariaLabels.socialMedia">
              <a href="#" [attr.aria-label]="t().ariaLabels.linkedin" class="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" [attr.aria-label]="t().ariaLabels.twitter" class="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" [attr.aria-label]="t().ariaLabels.facebook" class="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" [attr.aria-label]="t().ariaLabels.instagram" class="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </nav>
          </div>

          <div class="footer-column">
            <h3 class="column-title">Quick Links</h3>
            <nav class="footer-links" aria-label="Footer navigation">
              <a href="#what-we-do">{{ t().header.whatWeDo }}</a>
              <a href="#about">{{ t().header.aboutUs }}</a>
              <a href="#results">{{ t().header.results }}</a>
              <a href="#contact">{{ t().header.contactUs }}</a>
            </nav>
          </div>

          <div class="footer-column">
            <h3 class="column-title">Contact</h3>
            <div class="footer-contact">
              <div class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="contact-icon">
                  <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                </svg>
                <span>{{ t().footer.phoneNumber }}</span>
              </div>
              <div class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="contact-icon">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
                <span>{{ t().footer.email }}</span>
              </div>
              <div class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="contact-icon">
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                </svg>
                <span>Somerville, Florida, USA</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="bottom-content">
            <p class="copyright">{{ t().footer.copyright }}</p>
            <div class="footer-legal">
              <a href="#">Privacy Policy</a>
              <span class="separator">|</span>
              <a href="#">Terms of Service</a>
              <span class="separator">|</span>
              <a href="#">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0f172a;
      color: white;
      padding: 80px 24px 32px;
      position: relative;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1.2fr 1.5fr;
      gap: 60px;
      margin-bottom: 60px;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .logo {
      font-weight: 700;
      font-size: 28px;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .tagline {
      font-size: 16px;
      line-height: 1.6;
      opacity: 0.95;
      margin: 0 0 12px 0;
      font-weight: 500;
    }

    .description {
      font-size: 14px;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 24px 0;
      max-width: 400px;
    }

    .social-links {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .social-icon {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-icon:hover {
      background: rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.3);
      color: #60a5fa;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    }

    .social-icon:focus-visible,
    .footer-links a:focus-visible {
      outline: 2px solid #60a5fa;
      outline-offset: 4px;
      border-radius: 4px;
    }

    .footer-column {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .column-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      color: white;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 14px;
      font-weight: 400;
      transition: all 0.3s ease;
      display: inline-block;
      width: fit-content;
    }

    .footer-links a:hover {
      color: #60a5fa;
      transform: translateX(4px);
    }

    .footer-contact {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }

    .contact-icon {
      flex-shrink: 0;
      margin-top: 2px;
      color: rgba(255, 255, 255, 0.5);
    }

    .footer-bottom {
      padding-top: 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .copyright {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    }

    .footer-legal {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .footer-legal a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }

    .footer-legal a:hover {
      color: #60a5fa;
    }

    .separator {
      color: rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 968px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 48px;
      }

      .description {
        max-width: 100%;
      }

      .bottom-content {
        flex-direction: column;
        text-align: center;
      }

      .footer-legal {
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }

      .footer {
        padding: 60px 24px 24px;
      }
    }
  `]
})
export class FooterComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);
}
