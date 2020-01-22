import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeBreakdownChartComponent } from './income-breakdown-chart.component';

describe('IncomeBreakdownChartComponent', () => {
  let component: IncomeBreakdownChartComponent;
  let fixture: ComponentFixture<IncomeBreakdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeBreakdownChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeBreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
