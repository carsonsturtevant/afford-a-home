import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePriceCalculatorComponent } from './home-price-calculator.component';

describe('HomePriceCalculatorComponent', () => {
  let component: HomePriceCalculatorComponent;
  let fixture: ComponentFixture<HomePriceCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePriceCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePriceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
