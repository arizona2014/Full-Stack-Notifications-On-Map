import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FunctionsComponent } from './functions/functions.component';
import { AgmCoreModule } from "@agm/core";
import { DataService } from "./data.service";
import { HttpModule, Http } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FunctionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
      libraries: ["places"]
    })
  ],
  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
