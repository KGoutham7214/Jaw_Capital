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
        <p class="hero-subtitle">Let's discuss how we can help you achieve your trading objectives.</p>
      </div>
    </section>

    <section class="contact-form-section" appScrollAnimation animationClass="fade-in-up">
      <div class="container">
        <h2 class="form-title">Get in Touch</h2>
        <p class="form-subtitle">Please provide your information and we'll be in contact shortly.</p>

        <div class="step-indicator">
          <div class="step" [class.active]="currentStep >= 1" [class.completed]="currentStep > 1">
            <div class="step-number">1</div>
            <div class="step-label">Basic Details</div>
          </div>
          <div class="step-line" [class.completed]="currentStep > 1"></div>
          <div class="step" [class.active]="currentStep >= 2" [class.completed]="currentStep > 2">
            <div class="step-number">2</div>
            <div class="step-label">Address</div>
          </div>
          <div class="step-line" [class.completed]="currentStep > 2"></div>
          <div class="step" [class.active]="currentStep >= 3">
            <div class="step-number">3</div>
            <div class="step-label">Trading Experience</div>
          </div>
        </div>

        <form class="contact-form" #contactForm="ngForm" aria-label="Contact form">
          <div class="error-message" *ngIf="showError" role="alert">
            {{ errorMessage }}
          </div>
          <div class="success-message" *ngIf="showSuccess" role="status">
            {{ successMessage }}
          </div>

          <div *ngIf="currentStep === 1" class="form-step">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  [(ngModel)]="formData.firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  [attr.aria-label]="t().contact.firstName"
                  [class.error]="formErrors.firstName"
                  (keypress)="validateLettersOnly($event)"
                  required
                >
                <span class="field-error" *ngIf="formErrors.firstName">{{ formErrors.firstName }}</span>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  [(ngModel)]="formData.lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  [attr.aria-label]="t().contact.lastName"
                  [class.error]="formErrors.lastName"
                  (keypress)="validateLettersOnly($event)"
                  required
                >
                <span class="field-error" *ngIf="formErrors.lastName">{{ formErrors.lastName }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  placeholder="Enter your email address"
                  [attr.aria-label]="t().contact.email"
                  [class.error]="formErrors.email"
                  required
                >
                <span class="field-error" *ngIf="formErrors.email">{{ formErrors.email }}</span>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number *</label>
                <div class="phone-input-wrapper" [class.error]="formErrors.phone">
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
                    (keypress)="validateNumbersOnly($event)"
                    maxlength="15"
                  >
                </div>
                <span class="field-error" *ngIf="formErrors.phone">{{ formErrors.phone }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  [(ngModel)]="formData.dateOfBirth"
                  name="dateOfBirth"
                  [class.error]="formErrors.dateOfBirth"
                  required
                >
                <span class="field-error" *ngIf="formErrors.dateOfBirth">{{ formErrors.dateOfBirth }}</span>
              </div>
              <div class="form-group">
                <label for="nationality">Nationality *</label>
                <input
                  type="text"
                  id="nationality"
                  [(ngModel)]="formData.nationality"
                  name="nationality"
                  placeholder="Enter your nationality"
                  [class.error]="formErrors.nationality"
                  (keypress)="validateLettersOnly($event)"
                  required
                >
                <span class="field-error" *ngIf="formErrors.nationality">{{ formErrors.nationality }}</span>
              </div>
            </div>
          </div>

          <div *ngIf="currentStep === 2" class="form-step">
            <div class="form-group">
              <label for="street">Street Address *</label>
              <input
                type="text"
                id="street"
                [(ngModel)]="formData.street"
                name="street"
                placeholder="Enter your street address"
                aria-label="Street"
                [class.error]="formErrors.street"
                required
              >
              <span class="field-error" *ngIf="formErrors.street">{{ formErrors.street }}</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City *</label>
                <input
                  type="text"
                  id="city"
                  [(ngModel)]="formData.city"
                  name="city"
                  placeholder="Enter your city"
                  [class.error]="formErrors.city"
                  (keypress)="validateLettersOnly($event)"
                  required
                >
                <span class="field-error" *ngIf="formErrors.city">{{ formErrors.city }}</span>
              </div>
              <div class="form-group">
                <label for="state">State/Province *</label>
                <input
                  type="text"
                  id="state"
                  [(ngModel)]="formData.state"
                  name="state"
                  placeholder="Enter your state"
                  [class.error]="formErrors.state"
                  (keypress)="validateLettersOnly($event)"
                  required
                >
                <span class="field-error" *ngIf="formErrors.state">{{ formErrors.state }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="pincode">Pincode/ZIP Code *</label>
                <input
                  type="text"
                  id="pincode"
                  [(ngModel)]="formData.pincode"
                  name="pincode"
                  placeholder="Enter pincode"
                  [class.error]="formErrors.pincode"
                  maxlength="10"
                  required
                >
                <span class="field-error" *ngIf="formErrors.pincode">{{ formErrors.pincode }}</span>
              </div>
              <div class="form-group">
                <label for="country">Country *</label>
                <input
                  type="text"
                  id="country"
                  [(ngModel)]="formData.country"
                  name="country"
                  placeholder="Enter your country"
                  [class.error]="formErrors.country"
                  (keypress)="validateLettersOnly($event)"
                  required
                >
                <span class="field-error" *ngIf="formErrors.country">{{ formErrors.country }}</span>
              </div>
            </div>
          </div>

          <div *ngIf="currentStep === 3" class="form-step">
            <div class="form-row">
              <div class="form-group">
                <label for="annualIncome">Annual Income (USD) *</label>
                <input
                  type="text"
                  id="annualIncome"
                  [(ngModel)]="formData.annualIncome"
                  name="annualIncome"
                  placeholder="Enter your annual income"
                  aria-label="Annual Income"
                  [class.error]="formErrors.annualIncome"
                  (keypress)="validateNumbersOnly($event)"
                  required
                >
                <span class="field-error" *ngIf="formErrors.annualIncome">{{ formErrors.annualIncome }}</span>
              </div>
              <div class="form-group">
                <label for="employmentStatus">Employment Status *</label>
                <select
                  id="employmentStatus"
                  [(ngModel)]="formData.employmentStatus"
                  name="employmentStatus"
                  [class.error]="formErrors.employmentStatus"
                  required
                >
                  <option value="">Select employment status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                </select>
                <span class="field-error" *ngIf="formErrors.employmentStatus">{{ formErrors.employmentStatus }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="employer">Employer/Company *</label>
                <input
                  type="text"
                  id="employer"
                  [(ngModel)]="formData.employer"
                  name="employer"
                  placeholder="Enter your employer name"
                  [class.error]="formErrors.employer"
                  required
                >
                <span class="field-error" *ngIf="formErrors.employer">{{ formErrors.employer }}</span>
              </div>
              <div class="form-group">
                <label for="occupation">Occupation *</label>
                <input
                  type="text"
                  id="occupation"
                  [(ngModel)]="formData.occupation"
                  name="occupation"
                  placeholder="Enter your occupation"
                  [class.error]="formErrors.occupation"
                  required
                >
                <span class="field-error" *ngIf="formErrors.occupation">{{ formErrors.occupation }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="yearsOfExperience">Years of Trading Experience *</label>
                <select
                  id="yearsOfExperience"
                  [(ngModel)]="formData.yearsOfExperience"
                  name="yearsOfExperience"
                  [class.error]="formErrors.yearsOfExperience"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="none">No Experience</option>
                  <option value="less-than-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                <span class="field-error" *ngIf="formErrors.yearsOfExperience">{{ formErrors.yearsOfExperience }}</span>
              </div>
              <div class="form-group">
                <label for="tradingKnowledge">Trading Knowledge Level *</label>
                <select
                  id="tradingKnowledge"
                  [(ngModel)]="formData.tradingKnowledge"
                  name="tradingKnowledge"
                  [class.error]="formErrors.tradingKnowledge"
                  required
                >
                  <option value="">Select knowledge level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <span class="field-error" *ngIf="formErrors.tradingKnowledge">{{ formErrors.tradingKnowledge }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="investmentGoals">Investment Goals *</label>
              <textarea
                id="investmentGoals"
                [(ngModel)]="formData.investmentGoals"
                name="investmentGoals"
                placeholder="Describe your investment goals and objectives"
                [class.error]="formErrors.investmentGoals"
                rows="3"
                required
              ></textarea>
              <span class="field-error" *ngIf="formErrors.investmentGoals">{{ formErrors.investmentGoals }}</span>
            </div>

            <div class="form-group">
              <label for="riskTolerance">Risk Tolerance *</label>
              <select
                id="riskTolerance"
                [(ngModel)]="formData.riskTolerance"
                name="riskTolerance"
                [class.error]="formErrors.riskTolerance"
                required
              >
                <option value="">Select risk tolerance</option>
                <option value="conservative">Conservative - Prefer safety over returns</option>
                <option value="moderate">Moderate - Balanced approach</option>
                <option value="aggressive">Aggressive - Higher risk for higher returns</option>
                <option value="very-aggressive">Very Aggressive - Maximum risk tolerance</option>
              </select>
              <span class="field-error" *ngIf="formErrors.riskTolerance">{{ formErrors.riskTolerance }}</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" *ngIf="currentStep > 1" class="back-btn" (click)="previousStep()">Back</button>
            <button type="button" *ngIf="currentStep < totalSteps" class="next-btn" (click)="nextStep()">Next</button>
            <button type="button" *ngIf="currentStep === totalSteps" class="submit-btn" (click)="onSubmit()">{{ t().contact.submit }}</button>
          </div>
        </form>
      </div>
    </section>

    <section class="contact-info-section">
      <div class="container-wide">
        <h2 class="info-title">Connect with Us</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="icon-wrapper phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3>Phone Number</h3>
            <p>{{ t().footer.phoneNumber }}</p>
          </div>
          <div class="info-item">
            <div class="icon-wrapper email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3>Email</h3>
            <p>{{ t().footer.email }}</p>
          </div>
          <div class="info-item">
            <div class="icon-wrapper location">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3>Office Location</h3>
            <p>Whitehall St, Somerville, Florida, USA</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-hero {
      background: linear-gradient(rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.92)), url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920') center/cover no-repeat;
      color: white;
      padding: 140px 24px 100px;
      text-align: center;
      position: relative;
    }

    .contact-hero::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero-content {
      margin: 0 auto;
      padding: 0 40px;
      position: relative;
      z-index: 1;
    }

    .hero-title {
      font-size: 56px;
      font-weight: 300;
      margin: 0 0 16px 0;
      letter-spacing: -0.5px;
    }

    .hero-subtitle {
      font-size: 20px;
      opacity: 0.9;
      font-weight: 300;
      max-width: 700px;
      margin: 0 auto;
      margin: 0;
    }

    .contact-form-section {
      padding: 80px 24px;
      background: white;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .form-title {
      font-size: 36px;
      font-weight: 300;
      text-align: center;
      margin: 0 0 8px 0;
      color: #2952cc;
    }

    .form-subtitle {
      font-size: 16px;
      text-align: center;
      margin: 0 0 32px 0;
      color: #64748b;
      font-weight: 400;
    }

    .step-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 48px;
      padding: 0 20px;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .step-number {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #e2e8f0;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 18px;
      transition: all 0.3s;
    }

    .step.active .step-number {
      background: #2952cc;
      color: white;
    }

    .step.completed .step-number {
      background: #16a34a;
      color: white;
    }

    .step-label {
      font-size: 13px;
      font-weight: 500;
      color: #94a3b8;
      text-align: center;
      transition: all 0.3s;
    }

    .step.active .step-label {
      color: #2952cc;
      font-weight: 600;
    }

    .step.completed .step-label {
      color: #16a34a;
    }

    .step-line {
      width: 80px;
      height: 2px;
      background: #e2e8f0;
      margin: 0 12px;
      margin-bottom: 32px;
      transition: all 0.3s;
    }

    .step-line.completed {
      background: #16a34a;
    }

    .contact-form {
      background: #fafbfc;
      padding: 48px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .form-step {
      min-height: 400px;
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
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 15px;
      background: white;
      color: #1e293b;
      transition: all 0.3s;
      box-sizing: border-box;
    }

    input::placeholder {
      color: #9ca3af;
    }

    input:focus {
      outline: none;
      border-color: #2952cc;
      background: white;
      box-shadow: 0 0 0 3px rgba(41, 82, 204, 0.08);
    }

    select,
    textarea {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 15px;
      background: white;
      color: #1e293b;
      transition: all 0.3s;
      box-sizing: border-box;
      font-family: inherit;
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      padding-right: 40px;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    textarea::placeholder {
      color: #9ca3af;
    }

    select:focus,
    textarea:focus {
      outline: none;
      border-color: #2952cc;
      background: white;
      box-shadow: 0 0 0 3px rgba(41, 82, 204, 0.08);
    }

    select.error,
    textarea.error {
      border: 1px solid #dc2626;
      background: #fef2f2;
    }

    select.error:focus,
    textarea.error:focus {
      background: #fee;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .phone-input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding-right: 16px;
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

    .form-actions {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }

    .back-btn,
    .next-btn,
    .submit-btn {
      flex: 1;
      background: #2952cc;
      color: white;
      border: none;
      padding: 16px 32px;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .back-btn {
      background: #64748b;
    }

    .back-btn:hover {
      background: #475569;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);
    }

    .next-btn:hover,
    .submit-btn:hover {
      background: #1e3a8a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(41, 82, 204, 0.3);
    }

    .back-btn:focus-visible,
    .next-btn:focus-visible,
    .submit-btn:focus-visible {
      outline: 2px solid #2952cc;
      outline-offset: 4px;
    }

    .contact-info-section {
      padding: 100px 24px;
      background: #f9fafb;
    }

    .container-wide {
      max-width: 900px;
      margin: 0 auto;
    }

    .info-title {
      font-size: 36px;
      font-weight: 300;
      text-align: center;
      margin: 0 0 60px 0;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .info-grid .info-item:last-child {
      grid-column: 1 / -1;
      max-width: 400px;
      margin: 0 auto;
      width: 100%;
    }

    .info-item {
      text-align: center;
      padding: 48px 32px;
      background: white;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      transition: all 0.3s;
    }

    .info-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      border-color: #d1d5db;
    }

    .icon-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      transition: all 0.3s;
    }

    .icon-wrapper svg {
      width: 28px;
      height: 28px;
    }

    .icon-wrapper.phone {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      color: #dc2626;
    }

    .icon-wrapper.email {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      color: #2563eb;
    }

    .icon-wrapper.location {
      background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
      color: #16a34a;
    }

    .info-item:hover .icon-wrapper {
      transform: scale(1.1);
    }

    .info-item h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #1a1a1a;
      letter-spacing: -0.2px;
    }

    .info-item p {
      font-size: 15px;
      color: #6b7280;
      margin: 0;
      line-height: 1.6;
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

      .step-indicator {
        padding: 0 10px;
      }

      .step-line {
        width: 40px;
        margin: 0 8px;
      }

      .step-label {
        font-size: 11px;
      }

      .step-number {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }

      .form-step {
        min-height: 320px;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .info-grid .info-item:last-child {
        grid-column: 1;
        max-width: 100%;
      }

      .info-title {
        font-size: 28px;
      }

      .contact-info-section {
        padding: 60px 24px;
      }
    }
  `]
})
export class ContactPageComponent {
  private languageService = inject(LanguageService);
  t = this.languageService.getTranslations.bind(this.languageService);

  currentStep = 1;
  totalSteps = 3;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    annualIncome: '',
    employmentStatus: '',
    employer: '',
    occupation: '',
    yearsOfExperience: '',
    tradingKnowledge: '',
    investmentGoals: '',
    riskTolerance: ''
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

  nextStep() {
    this.formErrors = {};
    this.showError = false;

    if (this.currentStep === 1 && !this.validateStep1()) {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    if (this.currentStep === 2 && !this.validateStep2()) {
      this.showError = true;
      this.errorMessage = 'Please fill in all address fields correctly.';
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showError = false;
      this.formErrors = {};
    }
  }

  onSubmit() {
    this.formErrors = {};
    this.showError = false;
    this.showSuccess = false;

    if (!this.validateStep3()) {
      this.showError = true;
      this.errorMessage = 'Please fill in all trading experience fields.';
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
      this.currentStep = 1;
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        nationality: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        annualIncome: '',
        employmentStatus: '',
        employer: '',
        occupation: '',
        yearsOfExperience: '',
        tradingKnowledge: '',
        investmentGoals: '',
        riskTolerance: ''
      };
    }, 5000);
  }

  validateStep1(): boolean {
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

    if (!this.formData.dateOfBirth.trim()) {
      this.formErrors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    }

    if (!this.formData.nationality.trim()) {
      this.formErrors.nationality = 'Nationality is required';
      isValid = false;
    }

    return isValid;
  }

  validateStep2(): boolean {
    let isValid = true;

    if (!this.formData.street.trim()) {
      this.formErrors.street = 'Street address is required';
      isValid = false;
    }

    if (!this.formData.city.trim()) {
      this.formErrors.city = 'City is required';
      isValid = false;
    }

    if (!this.formData.state.trim()) {
      this.formErrors.state = 'State/Province is required';
      isValid = false;
    }

    if (!this.formData.pincode.trim()) {
      this.formErrors.pincode = 'Pincode/ZIP code is required';
      isValid = false;
    }

    if (!this.formData.country.trim()) {
      this.formErrors.country = 'Country is required';
      isValid = false;
    }

    return isValid;
  }

  validateStep3(): boolean {
    let isValid = true;

    if (!this.formData.annualIncome.trim()) {
      this.formErrors.annualIncome = 'Annual income is required';
      isValid = false;
    }

    if (!this.formData.employmentStatus) {
      this.formErrors.employmentStatus = 'Employment status is required';
      isValid = false;
    }

    if (!this.formData.employer.trim()) {
      this.formErrors.employer = 'Employer/Company is required';
      isValid = false;
    }

    if (!this.formData.occupation.trim()) {
      this.formErrors.occupation = 'Occupation is required';
      isValid = false;
    }

    if (!this.formData.yearsOfExperience) {
      this.formErrors.yearsOfExperience = 'Years of experience is required';
      isValid = false;
    }

    if (!this.formData.tradingKnowledge) {
      this.formErrors.tradingKnowledge = 'Trading knowledge level is required';
      isValid = false;
    }

    if (!this.formData.investmentGoals.trim()) {
      this.formErrors.investmentGoals = 'Investment goals are required';
      isValid = false;
    }

    if (!this.formData.riskTolerance) {
      this.formErrors.riskTolerance = 'Risk tolerance is required';
      isValid = false;
    }

    return isValid;
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
