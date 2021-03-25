import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekieClassPerfComponent } from './geekie-class-perf.component';

describe('GeekieClassPerfComponent', () => {
  let component: GeekieClassPerfComponent;
  let fixture: ComponentFixture<GeekieClassPerfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeekieClassPerfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekieClassPerfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
