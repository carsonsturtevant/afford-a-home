import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-payment-chart',
  templateUrl: './payment-chart.component.html',
  styleUrls: ['./payment-chart.component.scss']
})
export class PaymentChartComponent implements OnInit, OnChanges {

  @Input() monthlyPayment: number;
  @Input() interestRatePercent: number;
  @Input() suggestedDownPayment: number;
  @Input() suggHomePrice: number;
  @Input() hoa: number;
  @Input() pmi: number;
  @Input() taxesPercent: number;
  @Input() insurance: number;
  paymentChart: ApexCharts;

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
    this.monthlyPayment = this.appDataService.monthlyPayment.value;
    this.interestRatePercent = this.appDataService.interestRate.value;
    this.suggestedDownPayment = this.appDataService.downPayment.value;

    const paymentChartOptions = {
      plotOptions: {
        pie: {
          customScale: 0.9
        }
      },
      chart: {
        type: 'donut',
        fontFamily: 'Montserrat',
        height: '500px',
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
        '#008d8f',
        '#52be80',
        '#215870',
        '#007285',
        '#00a68c'],
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
      document.querySelector('#paymentChart'),
      paymentChartOptions
    );
    this.paymentChart.render();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (this.suggHomePrice === 0) { return; }
    const interest = Math.round(this.interestRatePercent / 12 * (this.suggHomePrice - this.suggestedDownPayment));
    const principle = Math.round(this.monthlyPayment - this.hoa - this.pmi - this.calculateTaxesAmount() - this.insurance - interest);
    this.paymentChart.updateSeries([
      principle,
      interest,
      Math.round(this.taxesPercent * this.suggHomePrice / 12),
      Math.round(this.insurance),
      Math.round(this.hoa),
      Math.round(this.pmi)
    ],
      true
    );
  }

  private calculateTaxesAmount(): number {
    if (this.taxesPercent === undefined || this.taxesPercent === 0 || this.suggHomePrice === 0) {
      return 0;
    } else {
      return this.taxesPercent * this.suggHomePrice / 12;
    }
  }
}
