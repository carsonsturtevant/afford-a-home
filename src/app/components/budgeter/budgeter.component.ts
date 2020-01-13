import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { Income } from 'src/app/models/Income';

@Component({
  selector: 'app-budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss']
})
export class BudgeterComponent implements OnInit {
  incomes: Income[];

  constructor(appDataService: AppDataService) {
    this.incomes = [new Income("Yearly Salary", appDataService.yearlySalary.value), new Income("Yearly Bonus", null)];
  }

  ngOnInit() {
  }

  addItem() {
    this.incomes.push(new Income());
  }

  removeItem(index) {
    this.incomes.splice(index, 1);
  }
}
