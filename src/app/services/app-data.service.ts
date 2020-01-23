import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  budgeterFeature: BehaviorSubject<boolean> = new BehaviorSubject(false);

  monthlyPayment: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  homePrice: BehaviorSubject<number> = new BehaviorSubject(null);
  downPayment: BehaviorSubject<number> = new BehaviorSubject(null);
  interestRate: BehaviorSubject<number> = new BehaviorSubject(null);
  yearlySalary: BehaviorSubject<number> = new BehaviorSubject(null);
  monthlyDebts: BehaviorSubject<number> = new BehaviorSubject(null);
  affordabilityPageIndex: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
   }

   updateMonthlyPayment(payment: number) {
     this.monthlyPayment.next(payment);
   }

   updateHomePrice(price: number) {
     this.homePrice.next(price);
   }

   updateDownPayment(payment: number) {
     this.downPayment.next(payment);
   }

   updateInterestRate(rate: number) {
    this.interestRate.next(rate);
  }

   updateYearlySalary(salary: number) {
     this.yearlySalary.next(salary);
   }

   updateMonthlyDebts(debts: number) {
     this.monthlyDebts.next(debts);
   }

   updateAffordabilityPageIndex(index: number) {
     this.affordabilityPageIndex.next(index);
   }
}
