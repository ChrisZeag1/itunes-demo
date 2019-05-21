import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { ItunesService } from './itunes.service';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';

@NgModule({
  declarations: [
    AppComponent,
    CollapsibleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItunesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
