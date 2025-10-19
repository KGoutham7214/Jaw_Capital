import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section class="fee-structure">
      <div class="animated-bg"></div>
      <div class="container">
        <div class="content-grid">
          <div class="title-section">
            <h2 class="section-title" appScrollAnimation animationClass="fade-in-up">Fee Structure</h2>
          </div>
          <div class="content-section">
            <p class="fee-text" appScrollAnimation animationClass="slide-in-right" [animationDelay]="100">
              The first $5,000 of profit generated will serve as the one-time cost for program access and installation.
            </p>
            <p class="fee-text" appScrollAnimation animationClass="slide-in-right" [animationDelay]="200">
              Thereafter, a 30% monthly performance fee will apply to realized profits. This fee ensures continued updates, monitoring, and support for the trading system.
            </p>
            <p class="fee-text" appScrollAnimation animationClass="slide-in-right" [animationDelay]="300">
              We believe this structure aligns our interests directly with those of our clients; we succeed only when you succeed. Please refer to the attached contract for full details.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .fee-structure {
      background: linear-gradient(135deg, #1e3a8a 0%, #2952cc 100%);
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
        radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
      position: relative;
      z-index: 1;
    }

    .content-grid {
      display: grid;
      grid-template-columns: minmax(250px, 400px) 1fr;
      gap: 80px;
      align-items: start;
    }

    .section-title {
      font-size: clamp(28px, 3vw, 48px);
      font-weight: 400;
      margin: 0;
      color: white;
    }

    .content-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .fee-text {
      font-size: clamp(14px, 1.2vw, 18px);
      line-height: 1.8;
      margin: 0;
      opacity: 0.95;
    }

    @media (max-width: 968px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }
    }
  `]
})
export class FeeStructureComponent {}
