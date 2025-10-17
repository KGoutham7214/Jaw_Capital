import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { HeroComponent } from '../../components/hero/hero.component';
import { WhatWeDoComponent } from '../../components/what-we-do/what-we-do.component';
import { ResultsComponent } from '../../components/results/results.component';
import { AboutComponent } from '../../components/about/about.component';
import { ContactCtaComponent } from '../../components/contact-cta/contact-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScrollAnimationDirective,
    HeroComponent,
    WhatWeDoComponent,
    ResultsComponent,
    AboutComponent,
    ContactCtaComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-what-we-do></app-what-we-do>
    <div appScrollAnimation animationClass="fade-in-up">
      <app-results></app-results>
    </div>
    <div appScrollAnimation animationClass="fade-in-up">
      <app-about></app-about>
    </div>
    <div appScrollAnimation animationClass="fade-in-up">
      <app-contact-cta></app-contact-cta>
    </div>
  `
})
export class HomeComponent {}
