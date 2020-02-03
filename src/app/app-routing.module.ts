import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AffordabilityComponent } from './components/affordability/affordability.component';
import { BudgeterComponent } from './components/budgeter/budgeter.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomePriceCalculatorComponent } from './components/home-price-calculator/home-price-calculator.component';

const routes: Routes = [
  { path: 'welcome-card', component: WelcomeCardComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'payment', component: AffordabilityComponent },
  { path: 'budgeter', component: BudgeterComponent },
  { path: 'home-price-calculator', component: HomePriceCalculatorComponent},
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
