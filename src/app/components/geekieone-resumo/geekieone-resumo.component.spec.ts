import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekieoneResumoComponent } from './geekieone-resumo.component';

describe('GeekieoneResumoComponent', () => {
  let component: GeekieoneResumoComponent;
  let fixture: ComponentFixture<GeekieoneResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeekieoneResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekieoneResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
