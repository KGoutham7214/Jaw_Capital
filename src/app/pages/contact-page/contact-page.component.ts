import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollAnimationDirective],
  template: `
    <section class="contact-hero">
      <div class="hero-content">
        <h1 class="hero-title">{{ t().contact.title }}</h1>
        <p class="hero-subtitle">"We can't wait to make awesomeness with you."</p>
      </div>
    </section>

    <section class="contact-form-section" appScrollAnimation animationClass="fade-in-up">
      <div class="container">
        <h2 class="form-title">Feel Free to Get in Touch</h2>
        <p class="form-subtitle">Write a Message</p>

        <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm" aria-label="Contact form">
          <div class="error-message" *ngIf="showError" role="alert">
            {{ errorMessage }}
          </div>
          <div class="success-message" *ngIf="showSuccess" role="status">
            {{ successMessage }}
          </div>
          <div class="form-row">
            <div class="form-group">
              <input
                type="text"
                id="firstName"
                [(ngModel)]="formData.firstName"
                name="firstName"
                placeholder="First Name"
                [attr.aria-label]="t().contact.firstName"
                [class.error]="formErrors.firstName"
                (keypress)="validateLettersOnly($event)"
                required
              >
              <span class="field-error" *ngIf="formErrors.firstName">{{ formErrors.firstName }}</span>
            </div>
            <div class="form-group">
              <input
                type="text"
                id="lastName"
                [(ngModel)]="formData.lastName"
                name="lastName"
                placeholder="Last Name"
                [attr.aria-label]="t().contact.lastName"
                [class.error]="formErrors.lastName"
                (keypress)="validateLettersOnly($event)"
                required
              >
              <span class="field-error" *ngIf="formErrors.lastName">{{ formErrors.lastName }}</span>
            </div>
          </div>

          <div class="form-group">
            <input
              type="text"
              id="address"
              [(ngModel)]="formData.address"
              name="address"
              placeholder="Address"
              aria-label="Address"
            >
          </div>

          <div class="form-group">
            <input
              type="email"
              id="email"
              [(ngModel)]="formData.email"
              name="email"
              placeholder="Email Address"
              [attr.aria-label]="t().contact.email"
              [class.error]="formErrors.email"
              required
            >
            <span class="field-error" *ngIf="formErrors.email">{{ formErrors.email }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <div class="phone-input-wrapper">
                <div class="country-selector-container">
                  <button type="button" class="country-selector" (click)="toggleCountryDropdown()" aria-label="Select country code">
                    <span class="flag">{{ selectedCountry.flag }}</span>
                    <span class="arrow">▼</span>
                  </button>
                  <div class="country-dropdown" *ngIf="showCountryDropdown" role="menu">
                    <div class="country-search">
                      <input
                        type="text"
                        [(ngModel)]="countrySearchTerm"
                        name="countrySearch"
                        placeholder="Search country..."
                        (click)="$event.stopPropagation()"
                        class="search-input"
                      >
                    </div>
                    <div class="country-list">
                      <button
                        *ngFor="let country of filteredCountries()"
                        type="button"
                        class="country-item"
                        (click)="selectCountry(country)"
                        role="menuitem"
                      >
                        <span class="country-flag">{{ country.flag }}</span>
                        <span class="country-name">{{ country.name }}</span>
                        <span class="country-code">{{ country.code }}</span>
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  type="tel"
                  id="phone"
                  [(ngModel)]="formData.phone"
                  name="phone"
                  placeholder="Phone Number"
                  [attr.aria-label]="t().contact.phoneNumber"
                  [class.error]="formErrors.phone"
                  (keypress)="validateNumbersOnly($event)"
                  maxlength="15"
                >
              </div>
              <span class="field-error" *ngIf="formErrors.phone">{{ formErrors.phone }}</span>
            </div>
            <div class="form-group">
              <input
                type="text"
                id="income"
                [(ngModel)]="formData.income"
                name="income"
                placeholder="Income"
                aria-label="Income"
                (keypress)="validateNumbersOnly($event)"
              >
            </div>
          </div>

          <div class="form-group">
            <input
              type="text"
              id="employeeDetails"
              [(ngModel)]="formData.employeeDetails"
              name="employeeDetails"
              placeholder="Employee Details"
              aria-label="Employee Details"
            >
          </div>

          <div class="form-group">
            <input
              type="text"
              id="experience"
              [(ngModel)]="formData.experience"
              name="experience"
              placeholder="Trading Experience"
              [attr.aria-label]="t().contact.tradingExperience"
            >
          </div>

          <button type="submit" class="submit-btn">{{ t().contact.submit }}</button>
        </form>
      </div>
    </section>

    <section class="contact-info-section">
      <div class="container">
        <h2 class="info-title">Connect with Us</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-icon" aria-hidden="true">📞</span>
            <div class="info-content">
              <h3>{{ t().footer.phoneNumber }}</h3>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon" aria-hidden="true">✉️</span>
            <div class="info-content">
              <h3>{{ t().footer.email }}</h3>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon" aria-hidden="true">📍</span>
            <div class="info-content">
              <h3>Office Location</h3>
              <p>Whitehall St, Somerville, Florida, USA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-hero {
      background: linear-gradient(rgba(41, 82, 204, 0.9), rgba(30, 58, 138, 0.9)),
                  url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="50" x="10" y="0" fill="%23ffffff" opacity="0.1"/></svg>');
      color: white;
      padding: 120px 24px 80px;
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 48px;
      font-weight: 400;
      margin: 0 0 16px 0;
      letter-spacing: -0.5px;
    }

    .hero-subtitle {
      font-size: 18px;
      opacity: 0.95;
      margin: 0;
    }

    .contact-form-section {
      padding: 80px 24px;
      background: white;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
    }

    .form-title {
      font-size: 32px;
      font-weight: 400;
      text-align: center;
      margin: 0 0 8px 0;
      color: #2952cc;
    }

    .form-subtitle {
      font-size: 18px;
      text-align: center;
      margin: 0 0 40px 0;
      color: #4a4a4a;
    }

    .contact-form {
      background: white;
      padding: 40px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    input {
      width: 100%;
      padding: 16px 20px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      background: #f0f3ff;
      color: #6b7280;
      transition: all 0.3s;
      box-sizing: border-box;
    }

    input::placeholder {
      color: #9ca3af;
    }

    input:focus {
      outline: none;
      background: #e5e9ff;
      box-shadow: 0 0 0 3px rgba(41, 82, 204, 0.1);
    }

    .phone-input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f0f3ff;
      border-radius: 8px;
      padding-right: 20px;
    }

    .country-selector {
      display: flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      padding: 16px 12px;
      cursor: pointer;
      color: #6b7280;
      font-size: 14px;
    }

    .flag {
      font-size: 20px;
    }

    .arrow {
      font-size: 10px;
    }

    .phone-input-wrapper input {
      background: transparent;
      padding: 16px 0;
      flex: 1;
    }

    .phone-input-wrapper input:focus {
      background: transparent;
      box-shadow: none;
    }

    .country-selector-container {
      position: relative;
    }

    .country-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: white;
      border: 1px solid #d0d0d0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      width: 280px;
      max-height: 320px;
      overflow: hidden;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    }

    .country-search {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      font-size: 14px;
      background: white;
    }

    .search-input:focus {
      outline: none;
      border-color: #2952cc;
      box-shadow: 0 0 0 2px rgba(41, 82, 204, 0.1);
      background: white;
    }

    .country-list {
      overflow-y: auto;
      max-height: 256px;
    }

    .country-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.2s;
      font-size: 14px;
    }

    .country-item:hover {
      background-color: #f0f3ff;
    }

    .country-flag {
      font-size: 20px;
      width: 24px;
    }

    .country-name {
      flex: 1;
      color: #1a1a1a;
    }

    .country-code {
      color: #6b7280;
      font-weight: 500;
    }

    .error-message {
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 6px;
      padding: 12px 16px;
      margin-bottom: 20px;
      color: #c33;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .success-message {
      background: #efe;
      border: 1px solid #cfc;
      border-radius: 6px;
      padding: 12px 16px;
      margin-bottom: 20px;
      color: #3c3;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .field-error {
      display: block;
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
    }

    input.error,
    .phone-input-wrapper.error {
      border: 1px solid #dc2626;
    }

    input.error {
      background: #fef2f2;
    }

    input.error:focus {
      background: #fee;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .submit-btn {
      width: 100%;
      background: #2952cc;
      color: white;
      border: none;
      padding: 14px 32px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s;
    }

    .submit-btn:hover {
      background: #1e3a8a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(41, 82, 204, 0.3);
    }

    .submit-btn:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
    }

    .contact-info-section {
      padding: 80px 24px;
      background: #f8f9fa;
    }

    .info-title {
      font-size: 32px;
      font-weight: 400;
      text-align: center;
      margin: 0 0 48px 0;
      color: #1a1a1a;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      max-width: 900px;
      margin: 0 auto;
    }

    .info-item {
      text-align: center;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .info-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 16px;
    }

    .info-content h3 {
      font-size: 18px;
      font-weight: 500;
      margin: 0 0 8px 0;
      color: #1a1a1a;
    }

    .info-content p {
      font-size: 14px;
      color: #4a4a4a;
      margin: 0;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .contact-form {
        padding: 24px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactPageComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);

  formData = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    income: '',
    employeeDetails: '',
    experience: ''
  };

  formErrors: any = {};
  showError = false;
  showSuccess = false;
  errorMessage = '';
  successMessage = '';
  showCountryDropdown = false;
  countrySearchTerm = '';

  countries = [
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
    { name: 'France', code: '+33', flag: '🇫🇷' },
    { name: 'Spain', code: '+34', flag: '🇪🇸' },
    { name: 'Italy', code: '+39', flag: '🇮🇹' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
    { name: 'Austria', code: '+43', flag: '🇦🇹' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪' },
    { name: 'Norway', code: '+47', flag: '🇳🇴' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰' },
    { name: 'Finland', code: '+358', flag: '🇫🇮' },
    { name: 'Ireland', code: '+353', flag: '🇮🇪' },
    { name: 'Poland', code: '+48', flag: '🇵🇱' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Greece', code: '+30', flag: '🇬🇷' },
    { name: 'Czech Republic', code: '+420', flag: '🇨🇿' },
    { name: 'Japan', code: '+81', flag: '🇯🇵' },
    { name: 'China', code: '+86', flag: '🇨🇳' },
    { name: 'South Korea', code: '+82', flag: '🇰🇷' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬' },
    { name: 'Hong Kong', code: '+852', flag: '🇭🇰' },
    { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦' },
    { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
    { name: 'Turkey', code: '+90', flag: '🇹🇷' },
    { name: 'Russia', code: '+7', flag: '🇷🇺' },
    { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
    { name: 'Israel', code: '+972', flag: '🇮🇱' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪' },
    { name: 'Thailand', code: '+66', flag: '🇹🇭' },
    { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
    { name: 'Philippines', code: '+63', flag: '🇵🇭' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾' }
  ];

  selectedCountry = this.countries[0];

  toggleCountryDropdown() {
    this.showCountryDropdown = !this.showCountryDropdown;
    if (!this.showCountryDropdown) {
      this.countrySearchTerm = '';
    }
  }

  filteredCountries() {
    if (!this.countrySearchTerm) {
      return this.countries;
    }
    const term = this.countrySearchTerm.toLowerCase();
    return this.countries.filter(country =>
      country.name.toLowerCase().includes(term) ||
      country.code.includes(term)
    );
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.showCountryDropdown = false;
    this.countrySearchTerm = '';
  }

  onSubmit() {
    this.formErrors = {};
    this.showError = false;
    this.showSuccess = false;

    if (!this.validateForm()) {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    console.log('Form submitted:', {
      ...this.formData,
      countryCode: this.selectedCountry.code
    });

    this.showSuccess = true;
    this.successMessage = 'Thank you! Your message has been sent successfully.';

    setTimeout(() => {
      this.showSuccess = false;
    }, 5000);
  }

  validateForm(): boolean {
    let isValid = true;

    if (!this.formData.firstName.trim()) {
      this.formErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!this.formData.lastName.trim()) {
      this.formErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!this.formData.email.trim()) {
      this.formErrors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.formData.email)) {
      this.formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!this.formData.phone.trim()) {
      this.formErrors.phone = 'Phone number is required';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateLettersOnly(event: KeyboardEvent): boolean {
    const char = event.key;
    const pattern = /^[a-zA-Z\s]$/;

    if (!pattern.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  validateNumbersOnly(event: KeyboardEvent): boolean {
    const char = event.key;
    const pattern = /^[0-9]$/;

    if (!pattern.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
