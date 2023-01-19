import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicPage } from "./public-module/public-page.module";
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './public-module/home-page/home-page.component';
import { BackgroundComponent } from './background/background.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';

import { StyledButtonComponent } from './components/styled-button/styled-button.component';




@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        StyledButtonComponent,
        CustomHeaderComponent,
        BackgroundComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        HttpClientModule
    ]
})
export class AppModule { }
