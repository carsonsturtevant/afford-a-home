import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import ApexCharts from 'apexcharts';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'affordability',
  templateUrl: './affordability.component.html',
  styleUrls: ['./affordability.component.scss']
})
export class AffordabilityComponent implements OnInit {

  yearlySalary: number;
  yearlySalaryFormatted: string;
  monthlyDebts: number;
  monthlyDebtsFormatted: string;
  monthlyPayment: number;
  pageIndex: number = 0;
  // sliderMax: number = 5000;
  
  constructor(private currencyPipe: CurrencyPipe, private appDataService: AppDataService) { }

  ngOnInit() {
    this.yearlySalary = this.appDataService.yearlySalary.value;
    this.monthlyDebts = this.appDataService.monthlyDebts.value;
    this.formatSalary(this.yearlySalary);
    this.formatDebts(this.monthlyDebts);
    this.monthlyPayment = Math.round(this.suggestedMonthlyPayment());
    this.pageIndex = this.appDataService.affordabilityPageIndex.value;
  }

  suggestedMonthlyPayment(): number {
    var debts: number = 0;
    if (this.monthlyDebts !== undefined) debts = this.monthlyDebts;

    var thirtySixPercent: number = (this.yearlySalary * .36 / 12);
    var twentyEightPercent: number = (this.yearlySalary * .28 / 12);

    thirtySixPercent -= debts;
    if (thirtySixPercent < twentyEightPercent) {
      this.appDataService.updateMonthlyPayment(thirtySixPercent);
      this.monthlyPayment = Math.round(thirtySixPercent);
      return thirtySixPercent;
    } else {
      this.appDataService.updateMonthlyPayment(twentyEightPercent);
      this.monthlyPayment = Math.round(twentyEightPercent);
      return twentyEightPercent;
    }
  }

  updateSalary(element) {
    this.yearlySalary = Math.round(element.target.value.replace(/\D/g,''));
    this.formatSalary(this.yearlySalary);
    this.appDataService.updateYearlySalary(this.yearlySalary);
    // this.sliderMax = Math.round(this.yearlySalary/12);
    this.monthlyPayment = Math.round(this.suggestedMonthlyPayment());
  }

  updateDebts(element) {
    this.monthlyDebts = element.target.value.replace(/\D/g,'');
    this.formatDebts(this.monthlyDebts);
    this.appDataService.updateMonthlyDebts(this.monthlyDebts);
    this.monthlyPayment = Math.round(this.suggestedMonthlyPayment());
  }
  
  formatSalary(salary: number) {
    this.yearlySalaryFormatted = this.currencyPipe.transform(salary, '$', '$', '1.0-0');
  }

  formatDebts(debts: number) {
    this.monthlyDebtsFormatted = this.currencyPipe.transform(debts, '$', '$', '1.0-0');
  }

  getHousingPercentage(): number {
    return (this.monthlyPayment/(this.yearlySalary/12))*100;
  }

  getDebtsPercentage(): number {
    if (!this.monthlyDebts) return 0; 
    return (this.monthlyDebts/(this.yearlySalary/12))*100;
  }

  pageIndexPlus() {
    if (this.pageIndex == 3) return;
    this.pageIndex++;
    this.appDataService.updateAffordabilityPageIndex(this.pageIndex);
  }

  pageIndexMinus() {
    if (this.pageIndex == 0) return;
    this.pageIndex--;
    this.appDataService.updateAffordabilityPageIndex(this.pageIndex);
  }

  // onSliderChange(event) {
  //   this.monthlyPayment = event;
  //   this.appDataService.updateMonthlyPayment(event);
  //   this.suggestedHomePrice();
  // }
}
