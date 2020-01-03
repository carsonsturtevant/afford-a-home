import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
}
