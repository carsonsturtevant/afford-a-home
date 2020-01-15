import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  budgeterFeature: boolean = true;

  constructor(appDataService: AppDataService) {
    this.budgeterFeature = appDataService.budgeterFeature.value;
   }

  ngOnInit() {
  }

}
