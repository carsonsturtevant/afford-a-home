import { Component, OnInit, Input } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home-price-calculator',
  templateUrl: './home-price-calculator.component.html',
  styleUrls: ['./home-price-calculator.component.scss']
})
export class HomePriceCalculatorComponent implements OnInit {

  @Input() payment: number;
  homePrice: number;
  homePriceFormatted: string;
  downPaymentPercent: number;
  downPaymentPercentFormatted: string;
  interestRatePercent: number;
  interestRatePercentFormatted: string;
  taxesPercent = .01;
  taxesPercentFormatted = '1.00%';
  insurance = 100;
  insuranceFormatted = '$100';
  hoa = 150;
  hoaFormatted = '$150';
  pmi = 0;
  pmiFormatted = '$0';
  suggHomePrice = 0;

  constructor(private currencyPipe: CurrencyPipe, private appDataService: AppDataService) { }

  ngOnInit() {
    this.payment = this.appDataService.monthlyPayment.value;
    this.downPaymentPercent = this.appDataService.downPayment.value;
    this.formatDownPayment((this.downPaymentPercent * 100).toString());
    this.interestRatePercent = this.appDataService.interestRate.value;
    this.formatInterestRate((this.interestRatePercent * 100).toString());
  }

  suggestedHomePrice(): number {
    if (this.downPaymentPercent == null || this.interestRatePercent == null || this.taxesPercent == null
    || this.insurance == null || this.hoa == null || this.pmi == null) {
      return undefined;
    }
    let suggHp = 1;
    let mp = 0;
    while (mp < this.payment) {
      mp = this.calculateMonthlyPaymentWithVariables(
        suggHp,
        this.downPaymentPercent,
        this.interestRatePercent,
        this.taxesPercent,
        this.insurance,
        this.hoa,
        this.pmi);
      suggHp += 50;
    }
    this.suggHomePrice = suggHp;
    this.appDataService.updateHomePrice(suggHp);
    return suggHp;
  }

  suggestedDownPayment(): number {
    return this.suggHomePrice * this.downPaymentPercent;
  }

  calculateMonthlyPaymentWithVariables(hp: number, dp: number, ir: number, tax: number, ins: number, hoa: number, pmi: number): number {
    dp = dp * hp;
    ir = ir / 12;
    tax = tax * hp / 12;
    return (
      (hp - dp)
      * (ir * ((1 + ir) ** 360))
      / (((1 + ir) ** 360) - 1)
      + +tax
      + +ins
      + +hoa
      + +pmi
    );
  }

  private calculateInterestRateMonthlyPercent(): number {
    if (this.interestRatePercent === 0) {
      return 0;
    } else {
      return this.interestRatePercent / 12;
    }
  }

  private calculateDownPaymentAmount(): number {
    return this.downPaymentPercent * this.homePrice;
  }

  formatHomePrice(element) {
    this.homePrice = element.target.value.replace(/\D/g, '');
    this.homePriceFormatted = this.currencyPipe.transform(this.homePrice, '$', '$', '1.0-0');
  }

  updateDownPayment(element) {
    if (element.target.value === '') {
      this.downPaymentPercent = undefined;
    } else {
      this.downPaymentPercent = element.target.value.replace(/[^0-9.]/g, '') / 100;
      this.appDataService.updateDownPayment(this.downPaymentPercent);
    }

    this.formatDownPayment(element.target.value);
  }

  formatDownPayment(dp) {
    const temp = this.replaceAll(dp, '%', '');
    if (temp === '') {
      this.downPaymentPercentFormatted = '';
    } else {
      this.downPaymentPercentFormatted = temp + '%';
    }
  }

  updateInterestRate(element) {
    if (element.target.value === '') {
      this.interestRatePercent = undefined;
    } else {
      this.interestRatePercent = element.target.value.replace(/[^0-9.]/g, '') / 100;
      this.appDataService.updateInterestRate(this.interestRatePercent);
    }

    this.formatInterestRate(element.target.value);
  }

  formatInterestRate(ir) {
    const temp = this.replaceAll(ir, '%', '');
    if (temp === '') {
      this.interestRatePercentFormatted = '';
    } else {
      this.interestRatePercentFormatted = temp + '%';
    }
  }

  formatTaxes(element) {
    if (element.target.value === '') {
      this.taxesPercent = undefined;
    } else {
      this.taxesPercent = element.target.value.replace(/[^0-9.]/g, '') / 100;
    }

    const temp = this.replaceAll(element.target.value, '%', '');
    if (temp === '') {
      this.taxesPercentFormatted = '';
    } else {
      this.taxesPercentFormatted = temp + '%';
    }
  }

  formatInsurance(element) {
    this.insurance = element.target.value.replace(/\D/g, '');
    this.insuranceFormatted = this.currencyPipe.transform(this.insurance, '$', '$', '1.0-0');
  }

  formatHoa(element) {
    this.hoa = element.target.value.replace(/\D/g, '');
    this.hoaFormatted = this.currencyPipe.transform(this.hoa, '$', '$', '1.0-0');
  }

  formatPmi(element) {
    this.pmi = element.target.value.replace(/\D/g, '');
    this.pmiFormatted = this.currencyPipe.transform(this.pmi, '$', '$', '1.0-0');
  }

  replaceAll(str: string, searchStr: string, replaceStr: string): string {
    // no match exists in string?
    if (str.indexOf(searchStr) === -1) {
      // return string
      return str;
    }

    // replace and remove first match, and do another recursirve search/replace
    return this.replaceAll(str.replace(searchStr, replaceStr), searchStr, replaceStr);
  }
}
