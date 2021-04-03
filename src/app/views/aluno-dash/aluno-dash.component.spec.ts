import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoDashComponent } from './aluno-dash.component';

describe('AlunoDashComponent', () => {
  let component: AlunoDashComponent;
  let fixture: ComponentFixture<AlunoDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
