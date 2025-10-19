import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  header: {
    whatWeDo: string;
    aboutUs: string;
    results: string;
    contactUs: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaButton: string;
  };
  whatWeDo: {
    title: string;
    description: string;
  };
  results: {
    title: string;
    subtitle: string;
    corporateAdvisory: string;
    details: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    tradingExperience: string;
    submit: string;
  };
  footer: {
    tagline: string;
    phoneNumber: string;
    email: string;
    copyright: string;
  };
  ariaLabels: {
    mainNavigation: string;
    languageSelector: string;
    socialMedia: string;
    expandDetails: string;
    collapseDetails: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    instagram: string;
    mainContent: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<Language>('en');

  private translations: Record<Language, Translations> = {
    en: {
      header: {
        whatWeDo: 'What we do',
        aboutUs: 'About us',
        results: 'Results',
        contactUs: 'Contact us'
      },
      hero: {
        title: 'Disciplined Trading\nQuantified Results',
        subtitle: '"Built on over a decade of independent active trading and quantitative precision."',
        ctaButton: 'Contact us'
      },
      whatWeDo: {
        title: 'What We Do',
        description: 'Our system is built around flexibility. By using a mix of proven strategies, technical indicators, and a maths collision, we\'re able to take advantage of opportunities whether the market is rising or falling. Every move we make is calculated, ensuring that we stay ahead of the game and deliver the results we\'re aiming for in the markets we\'ve worked hard to understand and predict.'
      },
      results: {
        title: 'Results',
        subtitle: 'Our portfolios built on a decade of trading. A collection of strategies built through backtest simulations and in live trading.',
        corporateAdvisory: 'Corporate Advisory',
        details: 'Comprehensive legal guidance for business formation contracts, and compliance needs.'
      },
      about: {
        title: 'About us',
        description: 'At JAW, you\'re in the backseat. Trading isn\'t just a skill, it\'s an art form we\'ve been passionate about for more than 10 years. Over that time, we\'ve learned how to adapt to the stock market\'s ups and downs, developing a style of day trading that helps us stay consistent no matter what direction things move in.'
      },
      contact: {
        title: 'Contact us',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phoneNumber: 'Phone Number',
        tradingExperience: 'Trading Experience',
        submit: 'Submit'
      },
      footer: {
        tagline: 'Built on over a decade of independent active trading and quantified precision.',
        phoneNumber: 'Phone number',
        email: 'Email',
        copyright: 'Copyright JAW. All materials Automated LLC and all of its affiliates. All rights reserved.'
      },
      ariaLabels: {
        mainNavigation: 'Main navigation',
        languageSelector: 'Select language',
        socialMedia: 'Social media links',
        expandDetails: 'Expand details',
        collapseDetails: 'Collapse details',
        linkedin: 'Visit our LinkedIn page',
        facebook: 'Visit our Facebook page',
        twitter: 'Visit our Twitter page',
        instagram: 'Visit our Instagram page',
        mainContent: 'Main content'
      }
    },
    es: {
      header: {
        whatWeDo: 'Qué hacemos',
        aboutUs: 'Sobre nosotros',
        results: 'Resultados',
        contactUs: 'Contáctenos'
      },
      hero: {
        title: 'Trading Disciplinado\nResultados Cuantificados',
        subtitle: '"Construido sobre más de una década de trading activo independiente y precisión cuantitativa."',
        ctaButton: 'Contáctenos'
      },
      whatWeDo: {
        title: 'Qué Hacemos',
        description: 'Nuestro sistema está construido en torno a la flexibilidad. Al usar una combinación de estrategias probadas, indicadores técnicos y una colisión matemática, podemos aprovechar las oportunidades ya sea que el mercado esté subiendo o bajando. Cada movimiento que hacemos es calculado, asegurando que nos mantengamos adelante del juego y entreguemos los resultados que buscamos en los mercados que hemos trabajado duro para entender y predecir.'
      },
      results: {
        title: 'Resultados',
        subtitle: 'Nuestras carteras construidas sobre una década de trading. Una colección de estrategias construidas a través de simulaciones de backtesting y en trading en vivo.',
        corporateAdvisory: 'Asesoría Corporativa',
        details: 'Orientación legal integral para contratos de formación empresarial y necesidades de cumplimiento.'
      },
      about: {
        title: 'Sobre nosotros',
        description: 'En JAW, estás en el asiento trasero. El trading no es solo una habilidad, es una forma de arte por la que hemos sido apasionados durante más de 10 años. Durante ese tiempo, hemos aprendido a adaptarnos a los altibajos del mercado de valores, desarrollando un estilo de day trading que nos ayuda a mantenernos consistentes sin importar en qué dirección se muevan las cosas.'
      },
      contact: {
        title: 'Contáctenos',
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo electrónico',
        phoneNumber: 'Número de teléfono',
        tradingExperience: 'Experiencia en Trading',
        submit: 'Enviar'
      },
      footer: {
        tagline: 'Construido sobre más de una década de trading activo independiente y precisión cuantificada.',
        phoneNumber: 'Número de teléfono',
        email: 'Correo electrónico',
        copyright: 'Copyright JAW. Todos los materiales Automated LLC y todas sus afiliadas. Todos los derechos reservados.'
      },
      ariaLabels: {
        mainNavigation: 'Navegación principal',
        languageSelector: 'Seleccionar idioma',
        socialMedia: 'Enlaces de redes sociales',
        expandDetails: 'Expandir detalles',
        collapseDetails: 'Contraer detalles',
        linkedin: 'Visita nuestra página de LinkedIn',
        facebook: 'Visita nuestra página de Facebook',
        twitter: 'Visita nuestra página de Twitter',
        instagram: 'Visita nuestra página de Instagram',
        mainContent: 'Contenido principal'
      }
    }
  };

  getTranslations(): Translations {
    return this.translations[this.currentLanguage()];
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    document.documentElement.lang = lang;
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage() === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
  }
}
