import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  monthlyPayment: BehaviorSubject<number>;
  homePrice: BehaviorSubject<number>;
  downPayment: BehaviorSubject<number>;
  yearlySalary: BehaviorSubject<number>;

  constructor() {
    this.monthlyPayment = new BehaviorSubject(0);
    this.homePrice = new BehaviorSubject(0);
    this.downPayment = new BehaviorSubject(0);
    this.yearlySalary = new BehaviorSubject(0);
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

   updateYearlySalary(salary: number) {
     this.yearlySalary.next(salary);
   }
}
