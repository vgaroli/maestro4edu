import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTarefasComponent } from './dash-tarefas.component';

describe('DashTarefasComponent', () => {
  let component: DashTarefasComponent;
  let fixture: ComponentFixture<DashTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashTarefasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
