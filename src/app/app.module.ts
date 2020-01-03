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
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeCardComponent } from './welcome-card/welcome-card.component';
import { AffordabilityComponent } from './affordability/affordability.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoutes: Routes = [
  { path: 'welcome-card', component: WelcomeCardComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'affordability', component: AffordabilityComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
   { path: '**', component: HomepageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeCardComponent,
    AffordabilityComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
