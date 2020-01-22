import { Component, OnInit, Input } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'income-breakdown-chart',
  templateUrl: './income-breakdown-chart.component.html',
  styleUrls: ['./income-breakdown-chart.component.scss']
})
export class IncomeBreakdownChartComponent implements OnInit {
  firstLoad: boolean = true;
  incomeBreakdownChart: ApexCharts;
  @Input() housingPercent: number;
  @Input() debtsPercent: number;

  constructor() { }

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
          }
      },
      colors: ['#2e4053','#008d8f','#52be80'],
      stroke: {
          width: 2,
          colors: ['#fff']
      },
      series: [{
        name: 'Housing',
        data: [this.housingPercent]
      }, {
        name: 'Debts',
        data: [this.debtsPercent]
      }, {
        name: 'Remaining',
        data: [100-Math.floor(this.housingPercent+this.debtsPercent)]
      }],
      title: {
      },
      xaxis: {
        categories: [""],
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
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
  }

  ngOnChanges() {
    if (this.firstLoad) {
      this.firstLoad = false;
      return;
    }
    this.incomeBreakdownChart.updateSeries(
      [{
        name: 'Housing',
        data: [this.housingPercent]
      }, {
        name: 'Debts',
        data: [this.debtsPercent]
      }, {
        name: 'Remaining',
        data: [100-Math.floor(this.housingPercent+this.debtsPercent)]
      }],
      true
    );
  }
}
