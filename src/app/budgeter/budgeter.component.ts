import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'budgeter',
  templateUrl: './budgeter.component.html',
  styleUrls: ['./budgeter.component.scss']
})
export class BudgeterComponent implements OnInit {

  homePrice: number;
  
  constructor() { }

  ngOnInit() {
  }

  onKeyHomePrice(value: number) {
    this.homePrice = value;
  }

}
