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
  homePrice: number;
  homePriceFormatted: string;
  monthlyPayment: number;
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
  incomeBreakdownChart: ApexCharts;
  paymentChart: ApexCharts;
  sliderMax: number = 5000;
  
  constructor(private currencyPipe: CurrencyPipe, private appDataService: AppDataService) { }

  ngOnInit() {
    var incomeBreakdownChartOptions = {
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
      colors: ['#2e4053','#008d8f','#52be80'],
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

    this.incomeBreakdownChart = new ApexCharts(
      document.querySelector("#incomeBreakdownChart"),
      incomeBreakdownChartOptions
    );
    this.incomeBreakdownChart.render();

    var paymentChartOptions = {
      plotOptions: {
        pie: {
          customScale: 0.9
        }
      },
      chart: {
        type: 'donut',
        fontFamily: 'Montserrat',
        toolbar: {
          show: false
        }
      },
      series: [],
      stroke: {
        width: 2,
        colors: ['#fff']
      },
      colors: ['#2e4053',
       '#215870',
       '#007285',
       '#008d8f',
       '#00a68c',
       '#52be80'],
      labels: ['Principle', 'Interest', 'Taxes', 'Insurance', 'HOA', 'PMI'],
      legend: {
        position: 'bottom'
      },
      title: {
        text: 'Payment Breakdown',
        style: {
          fontSize: '20px'
        }
      }
    };

    this.paymentChart = new ApexCharts(
      document.querySelector("#paymentChart"), 
      paymentChartOptions
    );
    this.paymentChart.render();
  }

  updateIncomeBreakdownChart() {
    this.incomeBreakdownChart.updateSeries(
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
      true
    );
  }

  updatePaymentChart() {
    this.suggestedHomePrice();
    if (this.suggHomePrice == 0) return;
    var interest = Math.round(this.interestRatePercent/12*(this.suggHomePrice-this.suggestedDownPayment()));
    var principle = Math.round(this.monthlyPayment - this.hoa - this.pmi - this.calculateTaxesAmount() - this.insurance - interest);
    this.paymentChart.updateSeries(
      //[],
      [principle, interest, Math.round(this.taxesPercent*this.suggHomePrice/12), Math.round(this.insurance), Math.round(this.hoa), Math.round(this.pmi)],
      true
    );
}

  getHousingPercentage(): number {
    return (this.monthlyPayment/(this.yearlySalary/12))*100;
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

  suggestedHomePrice(): number {
    if (this.downPaymentPercent == null || this.interestRatePercent == null || this.taxesPercent == null || this.insurance == null || this.hoa == null || this.pmi == null) {
      return undefined;
    }
    var suggHp: number = 1;
    var mp: number = 0;
    while (mp < this.monthlyPayment) {
      mp = this.calculateMonthlyPaymentWithVariables(suggHp, this.downPaymentPercent, this.interestRatePercent, this.taxesPercent, this.insurance, this.hoa, this.pmi);
      suggHp += 50;
    }
    this.suggHomePrice = suggHp;
    this.appDataService.updateHomePrice(suggHp);
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
    if (this.taxesPercent === undefined || this.taxesPercent == 0 || this.suggHomePrice == 0) 
      return 0;
    else
      return this.taxesPercent * this.suggHomePrice / 12;
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
    this.yearlySalary = Math.round(element.target.value.replace(/\D/g,''));
    this.yearlySalaryFormatted = this.currencyPipe.transform(this.yearlySalary, '$', '$', '1.0-0');
    this.appDataService.updateYearlySalary(this.yearlySalary);
    this.sliderMax = Math.round(this.yearlySalary/12);
    this.monthlyPayment = Math.round(this.suggestedMonthlyPayment());
    this.updateIncomeBreakdownChart();
    this.updatePaymentChart();
  }

  formatDebts(element) {
    this.monthlyDebts = element.target.value.replace(/\D/g,'');
    this.monthlyDebtsFormatted = this.currencyPipe.transform(this.monthlyDebts, '$', '$', '1.0-0');
    this.monthlyPayment = Math.round(this.suggestedMonthlyPayment());
    this.updateIncomeBreakdownChart();
    this.updatePaymentChart();
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
    this.updatePaymentChart();
  }

  formatInterestRate(element) {
    if (element.target.value == '')
      this.interestRatePercent = undefined;
    else this.interestRatePercent = element.target.value.replace(/[^0-9.]/g,'') / 100;
    
    var temp = this.replaceAll(element.target.value,"%","");
    if (temp == '')
      this.interestRatePercentFormatted = '';
    else this.interestRatePercentFormatted = temp + "%";
    this.updatePaymentChart();
  }

  formatTaxes(element) {
    if (element.target.value == '')
      this.taxesPercent = undefined;
    else this.taxesPercent = element.target.value.replace(/[^0-9.]/g,'') / 100;
    
    var temp = this.replaceAll(element.target.value,"%","");
    if (temp == '')
      this.taxesPercentFormatted = '';
    else this.taxesPercentFormatted = temp + "%";
    this.updatePaymentChart();
  }

  formatInsurance(element) {
    this.insurance = element.target.value.replace(/\D/g,'');
    this.insuranceFormatted = this.currencyPipe.transform(this.insurance, '$', '$', '1.0-0');
    this.updatePaymentChart();
  }

  formatHoa(element) {
    this.hoa = element.target.value.replace(/\D/g,'');
    this.hoaFormatted = this.currencyPipe.transform(this.hoa, '$', '$', '1.0-0');
    this.updatePaymentChart();
  }

  formatPmi(element) {
    this.pmi = element.target.value.replace(/\D/g,'');
    this.pmiFormatted = this.currencyPipe.transform(this.pmi, '$', '$', '1.0-0');
    this.updatePaymentChart();
  }

  onSliderChange(event) {
    this.monthlyPayment = event;
    this.appDataService.updateMonthlyPayment(event);
    this.suggestedHomePrice();
    this.updateIncomeBreakdownChart();
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
