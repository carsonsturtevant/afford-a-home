import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';
import { AffordabilityComponent } from './components/affordability/affordability.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BudgeterComponent } from './components/budgeter/budgeter.component';
import { FooterComponent } from './components/footer/footer.component';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { PaymentChartComponent } from './components/payment-chart/payment-chart.component';
import { IncomeBreakdownChartComponent } from './components/income-breakdown-chart/income-breakdown-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeCardComponent,
    AffordabilityComponent,
    HomepageComponent,
    BudgeterComponent,
    FooterComponent,
    EscapeHtmlPipe,
    PaymentChartComponent,
    IncomeBreakdownChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
