import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticaBuscaComponent } from './pratica-busca.component';

describe('PraticaBuscaComponent', () => {
  let component: PraticaBuscaComponent;
  let fixture: ComponentFixture<PraticaBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticaBuscaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticaBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
