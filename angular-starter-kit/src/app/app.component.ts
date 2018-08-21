import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');

    var lang = navigator.languages ? navigator.languages[0]
      : (navigator.language || navigator['userLanguage']);
    lang = lang.substring(0, 2);

    this.useLanguage(lang);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

}
