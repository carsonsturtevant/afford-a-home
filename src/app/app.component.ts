import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(appDataService: AppDataService) {
    appDataService.budgeterFeature.next(environment.budgeterFeature);
  }
  title = 'AffordAHome';
}
