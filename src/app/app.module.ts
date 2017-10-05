import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FunctionsComponent } from './functions/functions.component';
import { AgmCoreModule } from "@agm/core";


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FunctionsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
