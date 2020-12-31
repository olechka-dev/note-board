import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRouter } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        appRouter,
        BrowserAnimationsModule,
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
