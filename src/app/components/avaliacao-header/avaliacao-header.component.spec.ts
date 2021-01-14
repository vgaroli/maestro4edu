import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoHeaderComponent } from './avaliacao-header.component';

describe('AvaliacaoHeaderComponent', () => {
  let component: AvaliacaoHeaderComponent;
  let fixture: ComponentFixture<AvaliacaoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
