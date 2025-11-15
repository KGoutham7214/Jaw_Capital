import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-contact-cta',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollAnimationDirective],
  template: `
    <section class="contact-cta">
      <div class="animated-bg"></div>
      <div class="container">
        <div class="content">
          <h2 class="section-title" appScrollAnimation animationClass="fade-in-up">Contact us</h2>
          <p class="subtitle" appScrollAnimation animationClass="fade-in-up" [animationDelay]="100">Let's Connect</p>
          <p class="description" appScrollAnimation animationClass="fade-in-up" [animationDelay]="200">
            Have questions or want to learn more about our trading program?<br>
            Our team is here to guide you.
          </p>
          <button routerLink="/contact" class="contact-btn" type="button" appScrollAnimation animationClass="scale-in" [animationDelay]="300">
            Contact Our Team
            <span class="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 24px;
      position: relative;
      overflow: hidden;
    }

    .animated-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
      position: relative;
      z-index: 1;
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
      background: var(--bg-primary);
      color: var(--accent-primary);
      border: none;
      padding: 16px 40px;
      font-size: clamp(14px, 1.2vw, 18px);
      font-weight: 500;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .contact-btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
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
