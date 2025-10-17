import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="fee-structure">
      <div class="container">
        <div class="content-grid">
          <div class="title-section">
            <h2 class="section-title">Fee Structure</h2>
          </div>
          <div class="content-section">
            <p class="fee-text">
              The first $5,000 of profit generated will serve as the one-time cost for program access and installation.
            </p>
            <p class="fee-text">
              Thereafter, a 30% monthly performance fee will apply to realized profits. This fee ensures continued updates, monitoring, and support for the trading system.
            </p>
            <p class="fee-text">
              We believe this structure aligns our interests directly with those of our clients; we succeed only when you succeed. Please refer to the attached contract for full details.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .fee-structure {
      background: #2952cc;
      color: white;
      padding: 80px 24px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 60px;
      align-items: start;
    }

    .section-title {
      font-size: 32px;
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
      font-size: 14px;
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
      .section-title {
        font-size: 28px;
      }

      .fee-text {
        font-size: 15px;
      }
    }
  `]
})
export class FeeStructureComponent {}
