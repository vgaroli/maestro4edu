import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoGeekieChartComponent } from './tempo-geekie-chart.component';

describe('TempoGeekieChartComponent', () => {
  let component: TempoGeekieChartComponent;
  let fixture: ComponentFixture<TempoGeekieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempoGeekieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoGeekieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
