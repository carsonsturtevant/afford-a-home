import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss']
})
export class BudgeterComponent implements OnInit {

  yearlySalary: number;
  yearlySalaryFormatted: string;
  monthlyDebts: number;
  monthlyDebtsFormatted: string;
  homePrice: number;
  homePriceFormatted: string;
  downPaymentPercent: number;
  downPaymentPercentFormatted: string;
  interestRatePercent: number;
  interestRatePercentFormatted: string;
  taxesPercent: number;
  taxesPercentFormatted: string;
  insurance: number;
  insuranceFormatted: string;
  hoa: number;
  hoaFormatted: string;
  pmi: number;
  pmiFormatted: string;
  
  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
  }

  suggestedMonthlyPayment(): number {
    var debts: number = 0;
    if (this.monthlyDebts !== undefined) debts = this.monthlyDebts;

    var thirtySixPercent: number = (this.yearlySalary * .36 / 12);
    var twentyEightPercent: number = (this.yearlySalary * .28 / 12);

    thirtySixPercent -= debts;
    if (thirtySixPercent < twentyEightPercent)
      return thirtySixPercent;
    else return twentyEightPercent;
  }

  suggestedHomePrice(): number {
    var ir = .04/12;
    
    var ins = 77;
    var hoa = 175;
    var pmi = 0;
    var hp = (
      (this.suggestedMonthlyPayment() - ins - hoa - pmi)
      / (
          (ir * (1 + ir) ** 360)
          / ((1 + ir) ** 360 - 1)
      )
    );
    var tax = .0075 / 12 * 360 / 1.6;
    hp = hp * (1 - tax);
    hp = hp / .8;
    return hp;
  }

  // suggestedHomePrice(): number {
  //   var ir: number = .04/12;
  //   //var tax: number = .0075;
  //   var ins: number = 77;
  //   var hoa: number = 175;
  //   var pmi: number = 0;
  //   return (
  //     (((1 + ir) ** 360) - 1) * .8 * 1.000625
  //     * (this.suggestedMonthlyPayment()
  //     //- +tax
  //     - +ins
  //     - +hoa
  //     - +pmi)
  //     / (ir * ((1 + ir) ** 360))
      
  //   )
  // }

  suggestedDownPayment(): number {
    return this.suggestedHomePrice() * .2;
  }

  calculateMonthlyPayment() : number {
    var dp: number = this.calculateDownPaymentAmount();
    var ir: number = this.calculateInterestRateMonthlyPercent();
    var tax: number = this.calculateTaxesAmount();
    var ins: number = 0;
    if (this.insurance !== undefined) ins = this.insurance;
    var hoa: number = 0;
    if (this.hoa !== undefined) hoa = this.hoa;
    var pmi: number = 0;
    if (this.pmi !== undefined) pmi = this.pmi;

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

  private calculateTaxesAmount(): number {
    if (this.taxesPercent === undefined || this.taxesPercent == 0 || this.homePrice == 0) 
      return 0;
    else
      return this.taxesPercent * this.homePrice / 12;
  }

  private calculateInterestRateMonthlyPercent(): number {
    if (this.interestRatePercent == 0)
      return 0;
    else
      return this.interestRatePercent / 12;
  }

  private calculateDownPaymentAmount(): number {
    return this.downPaymentPercent * this.homePrice;
  }

  formatSalary(element) {
    this.yearlySalary = element.target.value.replace(/\D/g,'');
    this.yearlySalaryFormatted = this.currencyPipe.transform(this.yearlySalary, '$', '$', '1.0-0');
  }

  formatDebts(element) {
    this.monthlyDebts = element.target.value.replace(/\D/g,'');
    this.monthlyDebtsFormatted = this.currencyPipe.transform(this.monthlyDebts, '$', '$', '1.0-0');
  }

  formatHomePrice(element) {
    this.homePrice = element.target.value.replace(/\D/g,'');
    this.homePriceFormatted = this.currencyPipe.transform(this.homePrice, '$', '$', '1.0-0');
  }

  formatDownPayment(element) {
    if (element.target.value == '')
      this.downPaymentPercent = undefined;
    else this.downPaymentPercent = element.target.value.replace(/[^0-9.]/g,'') / 100;
    
    var temp = this.replaceAll(element.target.value,"%","");
    if (temp == '')
      this.downPaymentPercentFormatted = '';
    else this.downPaymentPercentFormatted = temp + "%";
  }

  formatInterestRate(element) {
    if (element.target.value == '')
      this.interestRatePercent = undefined;
    else this.interestRatePercent = element.target.value.replace(/[^0-9.]/g,'') / 100;
    
    var temp = this.replaceAll(element.target.value,"%","");
    if (temp == '')
      this.interestRatePercentFormatted = '';
    else this.interestRatePercentFormatted = temp + "%";
  }

  formatTaxes(element) {
    if (element.target.value == '')
      this.taxesPercent = undefined;
    else this.taxesPercent = element.target.value.replace(/[^0-9.]/g,'') / 100;
    
    var temp = this.replaceAll(element.target.value,"%","");
    if (temp == '')
      this.taxesPercentFormatted = '';
    else this.taxesPercentFormatted = temp + "%";
  }

  formatInsurance(element) {
    this.insurance = element.target.value.replace(/\D/g,'');
    this.insuranceFormatted = this.currencyPipe.transform(this.insurance, '$', '$', '1.0-0');
  }

  formatHoa(element) {
    this.hoa = element.target.value.replace(/\D/g,'');
    this.hoaFormatted = this.currencyPipe.transform(this.hoa, '$', '$', '1.0-0');
  }

  formatPmi(element) {
    this.pmi = element.target.value.replace(/\D/g,'');
    this.pmiFormatted = this.currencyPipe.transform(this.pmi, '$', '$', '1.0-0');
  }

  replaceAll(str: string, searchStr: string, replaceStr: string): string {
      // no match exists in string?
      if(str.indexOf(searchStr) === -1) {
          // return string
          return str;
      }
  
      // replace and remove first match, and do another recursirve search/replace
      return this.replaceAll(str.replace(searchStr, replaceStr), searchStr, replaceStr);
  }

  // isNumber(value: string | number): boolean
  // {
  //   return ((value != null) && !isNaN(Number(value.toString())));
  // }
}
