import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StyledButtonComponent } from "./styled-button/styled-button.component";
import { CustomHeaderComponent } from './custom-header/custom-header.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        StyledButtonComponent,
        CustomHeaderComponent,

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule
    ]
})
export class AppModule { }
