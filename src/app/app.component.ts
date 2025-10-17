import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { LanguageService } from './services/language.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <main id="main-content" [attr.aria-label]="t().ariaLabels.mainContent">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent implements OnInit {
  private languageService = inject(LanguageService);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  t = this.languageService.getTranslations.bind(this.languageService);

  ngOnInit(): void {
    this.languageService.setLanguage('en');

    this.router.events.pipe(
      filter((event): event is Scroll => event instanceof Scroll)
    ).subscribe((event: Scroll) => {
      if (event.anchor) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(event.anchor!);
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    });
  }
}
