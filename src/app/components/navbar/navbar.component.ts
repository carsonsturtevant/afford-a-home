import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  budgeterFeature = true;
  payment: number = null;

  constructor(private appDataService: AppDataService) {
    this.budgeterFeature = appDataService.budgeterFeature.value;
    this.appDataService.monthlyPayment.subscribe((item) => {
      this.payment = item;
    });
  }

  ngOnInit() {

  }

}
