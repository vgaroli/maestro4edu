import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boletim2020Component } from './boletim2020.component';

describe('Boletim2020Component', () => {
  let component: Boletim2020Component;
  let fixture: ComponentFixture<Boletim2020Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Boletim2020Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Boletim2020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
