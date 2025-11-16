import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  header: {
    whatWeDo: string;
    aboutUs: string;
    results: string;
    resources: string;
    contactUs: string;
  };
  hero: {
    title: string;
    tagline: string;
    subtitle: string;
    ctaButton: string;
  };
  whatWeDo: {
    title: string;
    description: string;
  };
  whatWeDoPage: {
    title: string;
    description1: string;
    description2: string;
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
        whatWeDo: 'What we offer',
        aboutUs: 'About us',
        results: 'Results',
        resources: 'Resources',
        contactUs: 'Contact us'
      },
      hero: {
        title: 'JAW Capital Management',
        tagline: 'Finally, everyday investors can access the power of hedge fund–style leveraged trading.',
        subtitle: 'JAW Capital Management proudly introduces the first-ever automated daily hedge fund trading system — a breakthrough in modern investing. Our proprietary platform harnesses advanced algorithms and real-time market analytics to trade daily with precision and discipline. Designed to capture short-term opportunities while minimizing risk, this system blends the power of automation with proven hedge fund strategies. Backed by over a decade of hands-on market experience, it delivers consistent, data-driven performance in both bullish and bearish environments. At JAW Capital Management, innovation meets execution — redefining what\'s possible in automated trading.',
        ctaButton: 'Contact us'
      },
      whatWeDo: {
        title: 'What We Offer',
        description: 'At JAW Capital Management, we have dedicated over a decade to mastering the art of day trading in the stock market. Over the years, our team has refined a disciplined approach that combines multiple strategies, advanced indicators, and carefully structured hedge positions. This approach allows us to remain flexible and profitable, whether the market is trending upward or experiencing a downturn. By relying on carefully calculated metrics, we are able to effectively hedge against risk and protect our capital, ensuring long-term stability in an often unpredictable environment. It is also important to note that JAW Capital Management operates as a private firm, meaning we do not manage or accept outside funds. Instead, we focus exclusively on growing and preserving our own capital through proven strategies and risk-managed decision-making.'
      },
      whatWeDoPage: {
        title: 'What We Do',
        description1: 'Our IT team has engineered a secure system that integrates seamlessly with client brokerage accounts. Installation of our program on your brokerage account is completed via Microsoft Teams, ensuring that we never request or store your account credentials. Following the formal agreement, our team will handle implementation and ongoing maintenance of the program. Clients are also kept informed of any recommended modifications to optimize performance.',
        description2: 'Our team has designed an automated trading program focused on leveraged ETFs, built upon our proven day trading strategies and supported by extensive quantitative research. The program has undergone rigorous back-testing over several years, demonstrating consistent performance that mirrors our live trading success. A summary of this back-testing data has been provided for your review.'
      },
      results: {
        title: 'Results',
        subtitle: 'Our system is built for flexibility, combining a mix of proven trading strategies, advanced technical indicators, and a structured hedge position to adapt to any market condition.',
        corporateAdvisory: 'Corporate Advisory',
        details: 'Comprehensive legal guidance for business formation contracts, and compliance needs.'
      },
      about: {
        title: 'About us',
        description: 'At JAW, you\'re in the backseat. Trading isn\'t just a skill to us—it\'s an art we\'ve perfected over more than a decade. Through years of navigating the market\'s highs and lows, we\'ve developed a disciplined day-trading approach designed to stay consistent regardless of market direction'
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
        whatWeDo: 'Qué ofrecemos',
        aboutUs: 'Sobre nosotros',
        results: 'Resultados',
        resources: 'Recursos',
        contactUs: 'Contáctenos'
      },
      hero: {
        title: 'JAW Capital Management',
        tagline: 'Finalmente, los inversores cotidianos pueden acceder al poder del trading apalancado al estilo de fondos de cobertura.',
        subtitle: 'JAW Capital Management presenta con orgullo el primer sistema automatizado de trading diario de fondos de cobertura — un avance revolucionario en la inversión moderna. Nuestra plataforma propietaria aprovecha algoritmos avanzados y análisis de mercado en tiempo real para operar diariamente con precisión y disciplina. Diseñado para capturar oportunidades a corto plazo mientras minimiza el riesgo, este sistema combina el poder de la automatización con estrategias probadas de fondos de cobertura. Respaldado por más de una década de experiencia práctica en el mercado, ofrece un rendimiento consistente y basado en datos tanto en entornos alcistas como bajistas. En JAW Capital Management, la innovación se encuentra con la ejecución — redefiniendo lo que es posible en el trading automatizado.',
        ctaButton: 'Contáctenos'
      },
      whatWeDo: {
        title: 'Qué Ofrecemos',
        description: 'Nuestro sistema está construido en torno a la flexibilidad. Al usar una combinación de estrategias probadas, indicadores técnicos y una colisión matemática, podemos aprovechar las oportunidades ya sea que el mercado esté subiendo o bajando. Cada movimiento que hacemos es calculado, asegurando que nos mantengamos adelante del juego y entreguemos los resultados que buscamos en los mercados que hemos trabajado duro para entender y predecir.'
      },
      whatWeDoPage: {
        title: 'Qué Hacemos',
        description1: 'Nuestro equipo de TI ha diseñado un sistema seguro que se integra perfectamente con las cuentas de corretaje de los clientes. La instalación de nuestro programa en su cuenta de corretaje se completa a través de Microsoft Teams, asegurando que nunca solicitemos ni almacenemos sus credenciales de cuenta. Después del acuerdo formal, nuestro equipo se encargará de la implementación y el mantenimiento continuo del programa. Los clientes también se mantienen informados de cualquier modificación recomendada para optimizar el rendimiento.',
        description2: 'Nuestro equipo ha diseñado un programa de trading automatizado enfocado en ETFs apalancados, construido sobre nuestras estrategias de day trading probadas y respaldado por una extensa investigación cuantitativa. El programa ha sido sometido a rigurosas pruebas retrospectivas durante varios años, demostrando un rendimiento consistente que refleja nuestro éxito en trading en vivo. Se ha proporcionado un resumen de estos datos de pruebas retrospectivas para su revisión.'
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
