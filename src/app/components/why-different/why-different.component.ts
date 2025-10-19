import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-why-different',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="why-different">
      <div class="container">
        <h2 class="section-title">Why This Is Different?</h2>

        <div class="content-block">
          <p class="intro-text">
            We're so confident in our program that we're offering it 100% free upfront. You pay nothing until you're making money. If you don't make money, neither do we.
          </p>
        </div>

        <div class="content-block">
          <p class="description">
            This is your chance to take advantage of professional-grade technology that works for you - built, tested, and backed by a team that only wins when you win.
          </p>
        </div>

        <div class="cta-section">
          <button routerLink="/contact" class="contact-btn" type="button">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .why-different {
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
      margin: 0 0 40px 0;
      color: #1a1a1a;
    }

    .content-block {
      margin-bottom: 24px;
    }

    .intro-text {
      font-size: clamp(16px, 1.4vw, 22px);
      line-height: 1.8;
      margin: 0;
      color: #1a1a1a;
      font-weight: 500;
    }

    .description {
      font-size: clamp(14px, 1.2vw, 18px);
      line-height: 1.8;
      margin: 0;
      color: #4a4a4a;
    }

    .cta-section {
      margin-top: 40px;
      text-align: center;
    }

    .contact-btn {
      background: #2952cc;
      color: white;
      border: none;
      padding: 16px 56px;
      font-size: clamp(14px, 1.2vw, 18px);
      font-weight: 500;
      cursor: pointer;
      border-radius: 24px;
      transition: all 0.3s;
    }

    .contact-btn:hover {
      background: #1e3a8a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(41, 82, 204, 0.3);
    }

    .contact-btn:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }
    }
  `]
})
export class WhyDifferentComponent {}
