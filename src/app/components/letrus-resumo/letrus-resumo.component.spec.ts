import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetrusResumoComponent } from './letrus-resumo.component';

describe('LetrusResumoComponent', () => {
  let component: LetrusResumoComponent;
  let fixture: ComponentFixture<LetrusResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetrusResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetrusResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
