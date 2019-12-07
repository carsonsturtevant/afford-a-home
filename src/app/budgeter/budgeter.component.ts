import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss']
})
export class BudgeterComponent implements OnInit {

  yearlySalary: number;
  formattedSalary: string;
  homePrice: number;
  downPaymentPercent: number;
  interestRatePercent: number;
  taxesPercent: number;
  insurance: number;
  hoa: number;
  pmi: number;
  
  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    this.calculateMonthlyPayment();
  }

  formatSalary(element) {
    this.yearlySalary = element.target.value.replace(/\D/g,'');
    this.formattedSalary = this.currencyPipe.transform(this.yearlySalary, '$', '$', '1.0-0');
  }

  suggestedMonthlyPayment(): number {
    return (this.yearlySalary * .28 / 12);
  }

  calculateMonthlyPayment() : number {
    var dp: number = this.calculateDownPaymentAmount();
    var ir: number = this.calculateInterestRateMonthlyPercent();
    var tax: number = this.calculateTaxesAmount();
    var ins: number = 0;
    if(this.insurance !== undefined) ins = this.insurance;
    var hoa: number = 0;
    if(this.hoa !== undefined) hoa = this.hoa;
    var pmi: number = 0;
    if(this.pmi !== undefined) pmi = this.pmi;

    if (this.homePrice <= 0 || this.homePrice == undefined)
      return null;
    else
      return (
        (this.homePrice - dp)
         * (ir * ((1 + ir) ** 360)) 
         / (((1 + ir) ** 360) - 1) 
         + +tax
         + +ins
         + +hoa
         + +pmi
      ); 
  }

  calculateTaxesAmount(): number {
    if (this.taxesPercent === undefined || this.taxesPercent == 0 || this.homePrice == 0) 
      return 0;
    else
      return this.taxesPercent * this.homePrice / 12;
  }

  calculateInterestRateMonthlyPercent(): number {
    if (this.interestRatePercent == 0)
      return 0;
    else
      return this.interestRatePercent / 12;
  }

  calculateDownPaymentAmount(): number {
    return this.downPaymentPercent * this.homePrice;
  }

  isNumber(value: string | number): boolean
  {
    return ((value != null) && !isNaN(Number(value.toString())));
  }
}
