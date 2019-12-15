import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import ApexCharts from 'apexcharts';

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
  taxesPercent: number = .0075;
  taxesPercentFormatted: string = ".75%";
  insurance: number = 77;
  insuranceFormatted: string = "$77";
  hoa: number = 175;
  hoaFormatted: string = "$175";
  pmi: number = 0;
  pmiFormatted: string = "$0";
  suggHomePrice: number = 0;
  chart: ApexCharts;
  
  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    var options = {
      chart: {
          height: 200,
          type: 'bar',
          stacked: true,
          stackType: '100%',
          fontFamily: 'Montserrat',
          toolbar: {
            show: false
          }
      },
      plotOptions: {
          bar: {
              horizontal: true,
          },
          
      },
      colors: ['#EB984E','#EC7063','#52BE80'],
      stroke: {
          width: 2,
          colors: ['#fff']
      },
      series: [{
        name: 'Housing',
        data: []
      }, {
        name: 'Debts',
        data: []
      }, {
        name: 'Remaining',
        data: []
      }],
      title: {
          text: 'Income Breakdown',
          style: {
            fontSize: '20px'
          }
      },
      xaxis: {
          categories: [""],
      },
      tooltip: {
              y: {
                  formatter: function(val) {
                  return Math.floor(val) + "%"
              }
          }
      },
      fill: {
          opacity: 1
          
      },
      legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }

    this.chart = new ApexCharts(
      document.querySelector("#chart"),
      options
    );

    this.chart.render();
  }

  renderChart() {
    this.chart.updateSeries(
    [{
      name: 'Housing',
      data: [this.getHousingPercentage()]
    }, {
      name: 'Debts',
      data: [this.getDebtsPercentage()]
    }, {
      name: 'Remaining',
      data: [100-Math.floor(this.getHousingPercentage()+this.getDebtsPercentage())]
    }],
    true);
    //this.chart.render();
  }

  getHousingPercentage(): number {
    return (this.suggestedMonthlyPayment()/(this.yearlySalary/12))*100;
  }

  getDebtsPercentage(): number {
    if (!this.monthlyDebts) return 0;
    return (this.monthlyDebts/(this.yearlySalary/12))*100;
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
    if (this.downPaymentPercent == null || this.interestRatePercent == null || this.taxesPercent == null || this.insurance == null || this.hoa == null || this.pmi == null) {
      return undefined;
    }
    var suggHp: number = 1;
    var mp: number = 0;
    while (mp < this.suggestedMonthlyPayment()) {
      mp = this.calculateMonthlyPaymentWithVariables(suggHp, this.downPaymentPercent, this.interestRatePercent, this.taxesPercent, this.insurance, this.hoa, this.pmi);
      suggHp += 50;
    }
    this.suggHomePrice = suggHp;
    return suggHp;
  }

  suggestedDownPayment(): number {
    return this.suggHomePrice * this.downPaymentPercent;
  }

  calculateMonthlyPayment(): number {
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
    this.renderChart();
  }

  formatDebts(element) {
    this.monthlyDebts = element.target.value.replace(/\D/g,'');
    this.monthlyDebtsFormatted = this.currencyPipe.transform(this.monthlyDebts, '$', '$', '1.0-0');
    this.renderChart();
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
