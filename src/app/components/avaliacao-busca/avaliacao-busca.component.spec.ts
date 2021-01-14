import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoBuscaComponent } from './avaliacao-busca.component';

describe('AvaliacaoBuscaComponent', () => {
  let component: AvaliacaoBuscaComponent;
  let fixture: ComponentFixture<AvaliacaoBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoBuscaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
