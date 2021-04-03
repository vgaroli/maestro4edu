import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSalaComponent } from './professor-sala.component';

describe('ProfessorSalaComponent', () => {
  let component: ProfessorSalaComponent;
  let fixture: ComponentFixture<ProfessorSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
