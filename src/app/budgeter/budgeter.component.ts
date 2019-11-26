import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss']
})
export class BudgeterComponent implements OnInit {

  homePrice: number = 480533;
  downPaymentPercent: number = .05;
  downPaymentAmount: number = 24026.65;
  interestRatePercent: number = .035;
  interestRateMonthlyPercent: number = .0029;
  taxesPercent: number = .0075;
  taxesAmount: number = 0;
  insurance: number = 77.5;
  hoa: number = 175;
  pmi: number = 0;
  //monthlyPayment: number;
  
  constructor() { }

  ngOnInit() {
    this.calculateMonthlyPayment();
  }

  calculateTaxesAmount() {
    if (this.taxesPercent == 0 || this.homePrice == 0) 
      this.taxesAmount = 0;
    else
      this.taxesAmount = this.taxesPercent * this.homePrice / 12;
  }

  calculateInterestRateMonthlyPercent() {
    if (this.interestRatePercent == 0)
      this.interestRateMonthlyPercent = 0;
    else
      this.interestRateMonthlyPercent = this.interestRatePercent / 12;
  }

  calculateDownPaymentAmount() {
    this.downPaymentAmount = this.downPaymentPercent * this.homePrice;
  }

  calculateMonthlyPayment() : number {
    this.calculateDownPaymentAmount();
    this.calculateInterestRateMonthlyPercent();
    this.calculateTaxesAmount();
    // if (this.homePrice == 0 || this.interestRatePercent == 0)
    //   this.monthlyPayment = 0;
    if (this.homePrice <= 0 || this.homePrice == undefined)
      return null;
    else
      return (
        (this.homePrice - this.downPaymentAmount)
         * (this.interestRateMonthlyPercent * ((1 + this.interestRateMonthlyPercent) ** 360)) 
         / (((1 + this.interestRateMonthlyPercent) ** 360) - 1) 
         + +this.insurance
         + +this.taxesAmount
         + +this.hoa
         + +this.pmi
      ); 
  }

  isNumber(value: string | number): boolean
  {
    return ((value != null) && !isNaN(Number(value.toString())));
  }

  // onKeyHomePrice(value: number) {
  //   this.homePrice = value;
  //   this.calculateMonthlyPayment();
  // }

  // onKeyDownPayment(value: number) {
  //   this.downPaymentPercent = value/100;
  //   this.calculateMonthlyPayment();
  // }

  // onKeyInterestRate(value: number) {
  //   this.interestRatePercent = value/100;
  //   this.calculateMonthlyPayment();
  // }

  // onKeyTaxes(value: number) {
  //   this.taxesPercent = value/100;
  //   this.calculateMonthlyPayment();
  // }

  // onKeyInsurance(value: number) {
  //   this.insurance = value;
  //   this.calculateMonthlyPayment();
  // }

  // onKeyHoa(value: number) {
  //   this.hoa = value;
  //   this.calculateMonthlyPayment();
  // }

  // onKeyPmi(value: number) {
  //   this.pmi = value;
  //   this.calculateMonthlyPayment();
  // }

}
