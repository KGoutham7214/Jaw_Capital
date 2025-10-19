import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-why-different',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollAnimationDirective],
  template: `
    <section class="why-different">
      <div class="pattern-overlay"></div>
      <div class="container">
        <h2 class="section-title" appScrollAnimation animationClass="fade-in-up">Why This Is Different?</h2>

        <div class="content-block" appScrollAnimation animationClass="slide-in-left" [animationDelay]="100">
          <p class="intro-text">
            We're so confident in our program that we're offering it 100% free upfront. You pay nothing until you're making money. If you don't make money, neither do we.
          </p>
        </div>

        <div class="content-block" appScrollAnimation animationClass="slide-in-right" [animationDelay]="200">
          <p class="description">
            This is your chance to take advantage of professional-grade technology that works for you - built, tested, and backed by a team that only wins when you win.
          </p>
        </div>

        <div class="cta-section" appScrollAnimation animationClass="scale-in" [animationDelay]="300">
          <button routerLink="/contact" class="contact-btn" type="button">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .why-different {
      background: #f8f9fb;
      padding: 80px 24px;
      position: relative;
      overflow: hidden;
    }

    .pattern-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        radial-gradient(circle at 20% 50%, rgba(41, 82, 204, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(41, 82, 204, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
      position: relative;
      z-index: 1;
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
      border-radius: 8px;
      transition: all 0.3s;
    }

    .contact-btn:hover {
      background: #1e3a8a;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 6px 20px rgba(41, 82, 204, 0.4);
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
