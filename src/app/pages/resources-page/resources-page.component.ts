import { Component, inject, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Resource {
  label: string;
  labelEs: string;
  url: string;
  description: string;
  descriptionEs: string;
}

interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  chartUrl: string;
  loading: boolean;
  error: boolean;
}

@Component({
  selector: 'app-resources-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resources-page">
      <div class="hero-section">
        <div class="container">
          <h1>{{ lang() === 'en' ? 'Trading Resources' : 'Recursos de Trading' }}</h1>
          <p>{{ lang() === 'en' ? 'Essential tools and market data for informed trading decisions' : 'Herramientas esenciales y datos de mercado para decisiones de trading informadas' }}</p>
        </div>
      </div>

      <div class="container content">
       <h2 class="section-title" >{{ lang() === 'en' ? 'Market Resources' : 'Recursos del Mercado' }}</h2>
        <div class="resources-grid">
          <a *ngFor="let resource of resources"
             [href]="resource.url"
             target="_blank"
             rel="noopener noreferrer"
             class="resource-card">
            <div class="resource-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
            <h2>{{ lang() === 'en' ? resource.label : resource.labelEs }}</h2>
            <p>{{ lang() === 'en' ? resource.description : resource.descriptionEs }}</p>
          </a>
        </div>
        <section class="stocks-section" style="margin-top: 80px;">
          <h2 class="section-title">{{ lang() === 'en' ? 'Stocks We Trade' : 'Acciones que Negociamos' }}</h2>
          <p class="section-description">
            {{ lang() === 'en'
              ? 'Live market data for our primary trading instruments'
              : 'Datos de mercado en vivo para nuestros instrumentos de trading principales' }}
          </p>

          <div class="stocks-grid">
            <div *ngFor="let stock of stocks()" class="stock-card" (click)="openModal(stock)">
              <div class="stock-header">
                <h3>{{ stock.symbol }}</h3>
              </div>

              <div *ngIf="stock.loading" class="stock-loading">
                <div class="spinner"></div>
                <p>{{ lang() === 'en' ? 'Loading...' : 'Cargando...' }}</p>
              </div>

              <div *ngIf="stock.error" class="stock-error">
                <p>{{ lang() === 'en' ? 'Unable to load data' : 'No se pudo cargar los datos' }}</p>
              </div>

              <div *ngIf="!stock.loading && !stock.error" class="stock-data">
                <div class="price-section">
                  <div class="price">\${{ stock.price }}</div>
                  <div class="change" [class.positive]="stock.change.startsWith('+')" [class.negative]="stock.change.startsWith('-')">
                    {{ stock.change }} ({{ stock.changePercent }})
                  </div>
                </div>

                <div class="chart-section">
                  <img [src]="stock.chartUrl" [alt]="stock.symbol + ' chart'" class="chart-image">
                </div>
              </div>
            </div>
          </div>
        </section>

        <div *ngIf="modalOpen()" class="modal-overlay" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="modal-close" (click)="closeModal()" [attr.aria-label]="lang() === 'en' ? 'Close modal' : 'Cerrar modal'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div *ngIf="selectedStock()" class="modal-body">
              <div class="modal-header">
                <h2>{{ selectedStock()!.symbol }}</h2>
              </div>

              <div class="modal-price-section">
                <div class="price large">\${{ selectedStock()!.price }}</div>
                <div class="change large" [class.positive]="selectedStock()!.change.startsWith('+')" [class.negative]="selectedStock()!.change.startsWith('-')">
                  {{ selectedStock()!.change }} ({{ selectedStock()!.changePercent }})
                </div>
              </div>

              <div class="modal-chart">
                <img [src]="selectedStock()!.chartUrl" [alt]="selectedStock()!.symbol + ' chart'" class="chart-image-large">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resources-page {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .hero-section {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: white;
      padding: 80px 0 60px;
      text-align: center;
    }

    .hero-section h1 {
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 700;
      margin: 0 0 16px 0;
      letter-spacing: -0.5px;
    }

    .hero-section p {
      font-size: clamp(16px, 2vw, 20px);
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .content {
      padding: 60px 24px;
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .resource-card {
      background: white;
      border-radius: 12px;
      padding: 32px;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 2px solid transparent;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .resource-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(41, 82, 204, 0.15);
      border-color: #2952cc;
    }

    .resource-card:focus-visible {
      outline: 3px solid #2952cc;
      outline-offset: 4px;
    }

    .resource-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #2952cc 0%, #1a3d99 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: transform 0.3s ease;
    }

    .resource-card:hover .resource-icon {
      transform: scale(1.1);
    }

    .resource-card h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
    }

    .resource-card p {
      margin: 0;
      font-size: 15px;
      color: #666;
      line-height: 1.6;
    }

    .stocks-section {
      margin-bottom: 60px;
    }

    .section-title {
      font-size: clamp(28px, 4vw, 36px);
      font-weight: 700;
      margin: 0 0 16px 0;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }

    .section-description {
      font-size: 18px;
      color: #666;
      margin: 0 0 32px 0;
      line-height: 1.6;
    }

    .stocks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .stock-card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      border: 2px solid #e5e7eb;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .stock-card:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: #2952cc;
      transform: translateY(-2px);
    }

    .stock-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .stock-header h3 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: #1a1a1a;
    }

    .stock-badge {
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      background: #e5e7eb;
      color: #4b5563;
    }

    .stock-loading,
    .stock-error {
      text-align: center;
      padding: 40px 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 16px;
      border: 4px solid #e5e7eb;
      border-top-color: #2952cc;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .stock-loading p,
    .stock-error p {
      margin: 0;
      color: #666;
    }

    .stock-data {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .price-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .price {
      font-size: 36px;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1;
    }

    .change {
      font-size: 16px;
      font-weight: 600;
    }

    .change.positive {
      color: #10b981;
    }

    .change.negative {
      color: #ef4444;
    }

    .chart-section {
      width: 100%;
      overflow: hidden;
      border-radius: 8px;
      background: #f9fafb;
    }

    .chart-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 24px;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-content {
      background: white;
      border-radius: 20px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: slideUp 0.3s ease-out;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    @keyframes slideUp {
      from {
        transform: translateY(40px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #f3f4f6;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #4b5563;
      z-index: 10;
    }

    .modal-close:hover {
      background: #e5e7eb;
      color: #1a1a1a;
      transform: scale(1.1);
    }

    .modal-body {
      padding: 48px;
    }

    .modal-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 42px;
      font-weight: 700;
      color: #1a1a1a;
    }

    .stock-badge.large {
      padding: 8px 16px;
      font-size: 14px;
    }

    .modal-price-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }

    .price.large {
      font-size: 56px;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1;
    }

    .change.large {
      font-size: 24px;
      font-weight: 600;
    }

    .modal-chart {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      background: #f9fafb;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .chart-image-large {
      width: 100%;
      height: auto;
      display: block;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 60px 0 40px;
      }

      .content {
        padding: 40px 24px;
      }

      .stocks-grid {
        grid-template-columns: 1fr;
      }

      .resources-grid {
        grid-template-columns: 1fr;
      }

      .resource-card,
      .stock-card {
        padding: 24px;
      }

      .price {
        font-size: 32px;
      }

      .modal-body {
        padding: 32px 24px;
      }

      .modal-header h2 {
        font-size: 32px;
      }

      .price.large {
        font-size: 42px;
      }

      .change.large {
        font-size: 20px;
      }

      .modal-close {
        top: 16px;
        right: 16px;
      }
    }
  `]
})
export class ResourcesPageComponent implements OnInit {
  private languageService = inject(LanguageService);
  private http = inject(HttpClient);
  lang = this.languageService.currentLanguage;

  stocks = signal<StockData[]>([
    {
      symbol: 'TQQQ',
      price: '0.00',
      change: '+0.00',
      changePercent: '0.00%',
      chartUrl: '',
      loading: true,
      error: false
    },
    {
      symbol: 'SQQQ',
      price: '0.00',
      change: '+0.00',
      changePercent: '0.00%',
      chartUrl: '',
      loading: true,
      error: false
    }
  ]);

  modalOpen = signal<boolean>(false);
  selectedStock = signal<StockData | null>(null);

  ngOnInit() {
    this.fetchStockData();
  }

  openModal(stock: StockData) {
    if (!stock.loading && !stock.error) {
      this.selectedStock.set(stock);
      this.modalOpen.set(true);
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.modalOpen.set(false);
    this.selectedStock.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.modalOpen()) {
      this.closeModal();
    }
  }

// at top of file


private async fetchStockData() {
  const symbols = ['SOXS', 'TSLL', 'SQQQ', 'TSLZ', 'NVDQ', 'QQQ', 'SPY', 'MSTU', 'SOXL', 'TSLS', 'TSLY', 'IBIT', 'JDST', 'TQQQ', 'TZA', 'IONZ', 'NVD', 'ULTY', 'ETHA', 'LQD', 'ETHD', 'XLF', 'HYG', 'DUST', 'SLV'];
  const apiKey = 'YNw4Ywb56SJzZvwQfjqLpg==kTlwrn83cloUWcUn'; // ⚠️ Move this to environment.ts for safety
  const baseUrl = 'https://api.api-ninjas.com/v1/stockprice?ticker=';

  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];

    try {
      const response: any = await this.http
        .get(baseUrl + symbol, {
          headers: { 'X-Api-Key': apiKey },
        })
        .toPromise();

      console.log('API Ninjas response for', symbol, response);

      const currentPrice = response.price;
      const name = response.name || symbol;
      const exchange = response.exchange || '-';
      const currency = response.currency || 'USD';
      const updated = response.updated
        ? new Date(response.updated * 1000).toLocaleTimeString()
        : '—';

      const chartUrl = `https://finviz.com/chart.ashx?t=${symbol}&ty=c&ta=1&p=d&s=l`;

       this.stocks.update(stocks => {
        const newStocks = [...stocks];
        newStocks[i] = {
          symbol,
          price: currentPrice?.toFixed(2) ?? '-',
          chartUrl,
          change: '—', // not available in API Ninjas basic endpoint
          changePercent: '—',
          loading: false,
          error: false,
        };
        return newStocks;
      });
    }catch (error) {
      console.error(`Error fetching ${symbol}:`, error);
      this.stocks.update(stocks => {
        const newStocks = [...stocks];
        newStocks[i] = {
          ...newStocks[i],
          loading: false,
          error: true,
        };
        return newStocks;
      });
    }
  }
}



  resources: Resource[] = [
    {
      label: 'Economic Calendar',
      labelEs: 'Calendario Económico',
      url: 'https://finviz.com/calendar/economic',
      description: 'Track key economic events and data releases that impact market movements',
      descriptionEs: 'Seguimiento de eventos económicos clave y publicaciones de datos que impactan los movimientos del mercado'
    },
    {
      label: 'Market News',
      labelEs: 'Noticias del Mercado',
      url: 'https://www.investing.com/news/stock-market-news',
      description: 'Stay updated with the latest stock market news and financial insights',
      descriptionEs: 'Mantente actualizado con las últimas noticias del mercado de valores y perspectivas financieras'
    },
    {
      label: 'Markets',
      labelEs: 'Mercados',
      url: 'https://www.investing.com/equities',
      description: 'Access real-time market data, quotes, and equity performance metrics',
      descriptionEs: 'Accede a datos de mercado en tiempo real, cotizaciones y métricas de rendimiento de acciones'
    },
    {
      label: 'Insider Trading',
      labelEs: 'Trading de Insiders',
      url: 'https://finviz.com/insidertrading.ashx',
      description: 'Monitor insider trading activity and institutional transactions',
      descriptionEs: 'Monitorea la actividad de trading de insiders y transacciones institucionales'
    },
    {
      label: 'Market Maps',
      labelEs: 'Mapas del Mercado',
      url: 'https://finviz.com/map.ashx',
      description: 'Visualize market performance with interactive heat maps and sector analysis',
      descriptionEs: 'Visualiza el rendimiento del mercado con mapas de calor interactivos y análisis sectorial'
    }
  ];
}
