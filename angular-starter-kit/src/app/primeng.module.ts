import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';

const ngPrimeList = [
  CalendarModule,
  OverlayPanelModule
];

@NgModule({
  imports: ngPrimeList,
  exports: ngPrimeList
})
export class NGPrimeModule { }