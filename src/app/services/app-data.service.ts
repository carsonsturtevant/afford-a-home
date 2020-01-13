import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  monthlyPayment: BehaviorSubject<number>;
  homePrice: BehaviorSubject<number>;
  downPayment: BehaviorSubject<number>;
  interestRate: BehaviorSubject<number>;
  yearlySalary: BehaviorSubject<number>;
  monthlyDebts: BehaviorSubject<number>;

  constructor() {
    this.monthlyPayment = new BehaviorSubject(null);
    this.homePrice = new BehaviorSubject(null);
    this.downPayment = new BehaviorSubject(null);
    this.interestRate = new BehaviorSubject(null);
    this.yearlySalary = new BehaviorSubject(null);
    this.monthlyDebts = new BehaviorSubject(null);
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
}
