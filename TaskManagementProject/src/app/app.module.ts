import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './public-module/home-page/home-page.component';
import { BackgroundComponent } from './background/background.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { StyledButtonComponent } from './components/styled-button/styled-button.component';

import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './tasks/components/create-task/create-task.component';
import { ListComponent } from './tasks/components/list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';




@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        StyledButtonComponent,
        CustomHeaderComponent,
        BackgroundComponent,
        TasksComponent,
        CreateTaskComponent,
        ListComponent,
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
        HttpClientModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatCheckboxModule,
        MatToolbarModule,
        HttpClientModule,
    ]
})
export class AppModule {}
