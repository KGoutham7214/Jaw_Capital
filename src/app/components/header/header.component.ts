import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header" role="banner">
      <div class="container">
        <div class="logo-container">
          <a routerLink="/" class="logo" aria-label="JAW Logo">
            <img src="assets/logo_only.png" alt="JAW Capital Management" />
          </a>
          <a routerLink="/" class="logo text-only" aria-label="JAW Logo">
            <img src="assets/logo_text.png" alt="JAW Capital Management" />
          </a>
        </div>

        <button class="mobile-menu-btn" (click)="toggleMobileMenu()" type="button" aria-label="Toggle menu">
          <span class="hamburger" [class.open]="isMobileMenuOpen()"></span>
        </button>

        <nav class="nav" [class.mobile-open]="isMobileMenuOpen()" [attr.aria-label]="t().ariaLabels.mainNavigation">
          <a routerLink="/what-we-do" (click)="closeMobileMenu()">{{ t().header.whatWeDo }}</a>
          <a routerLink="/" fragment="about" (click)="closeMobileMenu()">{{ t().header.aboutUs }}</a>
          <a routerLink="/" fragment="results" (click)="closeMobileMenu()">{{ t().header.results }}</a>
          <a routerLink="/resources" (click)="closeMobileMenu()">{{ t().header.resources }}</a>
          <a routerLink="/contact" (click)="closeMobileMenu()">{{ t().header.contactUs }}</a>

          <div class="language-dropdown mobile-language">
            <button
              class="language-btn"
              (click)="toggleDropdown()"
              [attr.aria-label]="t().ariaLabels.languageSelector"
              [attr.aria-expanded]="isDropdownOpen()"
              type="button"
            >
              {{ lang().toUpperCase() }} <span class="arrow" aria-hidden="true">▼</span>
            </button>
            <div class="dropdown-menu" *ngIf="isDropdownOpen()" role="menu">
              <button
                class="dropdown-item"
                [class.active]="lang() === 'en'"
                (click)="selectLanguage('en')"
                type="button"
                role="menuitem"
              >
                EN - English
              </button>
              <button
                class="dropdown-item"
                [class.active]="lang() === 'es'"
                (click)="selectLanguage('es')"
                type="button"
                role="menuitem"
              >
                ES - Español
              </button>
            </div>
          </div>
        </nav>

        <div class="header-controls">
          <button
            class="theme-toggle"
            (click)="toggleTheme()"
            [attr.aria-label]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
            type="button"
          >
            <span class="theme-icon">{{ themeService.isDarkMode() ? '☀️' : '🌙' }}</span>
          </button>

          <div class="language-dropdown desktop-language">
            <button
              class="language-btn"
              (click)="toggleDropdown()"
              [attr.aria-label]="t().ariaLabels.languageSelector"
              [attr.aria-expanded]="isDropdownOpen()"
              type="button"
            >
              {{ lang().toUpperCase() }} <span class="arrow" aria-hidden="true">▼</span>
            </button>
            <div class="dropdown-menu" *ngIf="isDropdownOpen()" role="menu">
              <button
                class="dropdown-item"
                [class.active]="lang() === 'en'"
                (click)="selectLanguage('en')"
                type="button"
                role="menuitem"
              >
                EN - English
              </button>
              <button
                class="dropdown-item"
                [class.active]="lang() === 'es'"
                (click)="selectLanguage('es')"
                type="button"
                role="menuitem"
              >
                ES - Español
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--bg-primary);
      padding: 24px 0;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .container {
      margin: 0 auto;
      padding: 0 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

   
    .logo-container{
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .logo {
      font-weight: 700;
      font-size: clamp(18px, 1.5vw, 24px);
      letter-spacing: 0.5px;
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
    }

    .text-only {
      height: 40px;
    }

    .logo img {
      height: 40px;
      width: auto;
      transition: all 0.3s ease;
    }

    .logo:hover {
      color: var(--accent-primary);
      transform: scale(1.05);
    }

    .logo:hover img {
      filter: brightness(1.1);
    }

    .nav {
      display: flex;
      gap: clamp(24px, 3vw, 48px);
    }

    .nav a {
      color: var(--text-primary);
      text-decoration: none;
      font-size: clamp(13px, 1.1vw, 16px);
      transition: all 0.3s ease;
      position: relative;
    }

    .nav a:hover {
      color: var(--accent-primary);
      transform: translateY(-1px);
    }

    .nav a:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
      border-radius: 4px;
    }

    .language-dropdown {
      position: relative;
    }

    .language-btn {
      font-size: clamp(13px, 1.1vw, 16px);
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      transition: all 0.3s;
      padding: 10px 18px;
      border-radius: 4px;
      min-width: 90px;
      justify-content: space-between;
    }

    .language-btn:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(41, 82, 204, 0.15);
    }

    .language-btn:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      box-shadow: var(--shadow-md);
      min-width: 160px;
      z-index: 1000;
      overflow: hidden;
    }

    .dropdown-item {
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      text-align: left;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: var(--text-primary);
    }

    .dropdown-item:hover {
      background-color: var(--bg-tertiary);
    }

    .dropdown-item.active {
      background-color: var(--accent-primary);
      color: white;
    }

    .dropdown-item:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: -2px;
    }

    .arrow {
      font-size: 10px;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .theme-toggle {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      height: 44px;
    }

    .theme-toggle:hover {
      border-color: var(--accent-primary);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(41, 82, 204, 0.15);
    }

    .theme-toggle:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
    }

    .theme-icon {
      font-size: 20px;
      line-height: 1;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      z-index: 101;
    }

    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      position: relative;
      transition: background 0.3s;
    }

    .hamburger::before,
    .hamburger::after {
      content: '';
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      position: absolute;
      transition: transform 0.3s;
    }

    .hamburger::before {
      top: -8px;
    }

    .hamburger::after {
      top: 8px;
    }

    .hamburger.open {
      background: transparent;
    }

    .hamburger.open::before {
      transform: rotate(45deg);
      top: 0;
    }

    .hamburger.open::after {
      transform: rotate(-45deg);
      top: 0;
    }

    .desktop-language {
      display: block;
    }

    .mobile-language {
      display: none;
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }

      .mobile-menu-btn {
        display: block;
      }

      .desktop-language {
        display: none;
      }

      .mobile-language {
        display: block;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e0e0e0;
      }

      .nav {
        position: fixed;
        top: 73px;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        flex-direction: column;
        gap: 0;
        padding: 24px;
        box-shadow: var(--shadow-md);
        transform: translateX(-100%);
        transition: transform 0.3s;
        z-index: 99;
      }

      .nav.mobile-open {
        transform: translateX(0);
      }

      .nav a {
        padding: 12px 0;
        border-bottom: 1px solid var(--border-light);
      }

      .nav a:last-of-type {
        border-bottom: none;
      }
    }
  `]
})
export class HeaderComponent {
  private languageService = inject(LanguageService);
  themeService = inject(ThemeService);

  lang = this.languageService.currentLanguage;
  t = this.languageService.getTranslations.bind(this.languageService);
  isDropdownOpen = signal(false);
  isMobileMenuOpen = signal(false);

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  selectLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
    this.isDropdownOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
