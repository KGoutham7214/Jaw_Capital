import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="contact-cta">
      <div class="container">
        <div class="content">
          <h2 class="section-title">Contact us</h2>
          <p class="subtitle">Let's Connect</p>
          <p class="description">
            Have questions or want to learn more about our trading program?<br>
            Our team is here to guide you.
          </p>
          <button routerLink="/contact" class="contact-btn" type="button">
            Contact Our Team
            <span class="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-cta {
      background: #2952cc;
      color: white;
      padding: 80px 24px;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
    }

    .content {
      text-align: left;
    }

    .section-title {
      font-size: clamp(28px, 3vw, 48px);
      font-weight: 400;
      margin: 0 0 12px 0;
      color: white;
    }

    .subtitle {
      font-size: clamp(18px, 1.8vw, 28px);
      font-weight: 500;
      margin: 0 0 24px 0;
      opacity: 0.95;
    }

    .description {
      font-size: clamp(14px, 1.2vw, 18px);
      line-height: 1.8;
      margin: 0 0 40px 0;
      opacity: 0.9;
    }

    .contact-btn {
      background: white;
      color: #2952cc;
      border: none;
      padding: 16px 40px;
      font-size: clamp(14px, 1.2vw, 18px);
      font-weight: 500;
      cursor: pointer;
      border-radius: 24px;
      transition: all 0.3s;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .contact-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
    }

    .contact-btn:focus-visible {
      outline: 2px solid white;
      outline-offset: 4px;
    }

    .arrow {
      font-size: 18px;
      transition: transform 0.3s;
    }

    .contact-btn:hover .arrow {
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }
    }
  `]
})
export class ContactCtaComponent {}
