import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {AppSettings} from './app.settings';
import {TranslationService} from './services/translation/translation.service';
import {MapModule} from './map/map.module';
import {DetailsSectionModule} from './details-section/details-section.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function createLocaleIdFactory(translationService: TranslationService) {
  return translationService.currentLanguageCode || AppSettings.defaultLanguageCode;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(AppSettings.translationConfig),
    MapModule,
    DetailsSectionModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: createLocaleIdFactory,
      deps: [TranslationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
