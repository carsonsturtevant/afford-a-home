import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  monthlyPayment: number;
  homePrice: number;

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
    this.appDataService.monthlyPayment.subscribe( c => {
      this.monthlyPayment = c;
    });

    this.appDataService.homePrice.subscribe( c => {
      this.homePrice = c;
    });
  }

}
