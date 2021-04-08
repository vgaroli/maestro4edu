import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomResumoComponent } from './classroom-resumo.component';

describe('ClassroomResumoComponent', () => {
  let component: ClassroomResumoComponent;
  let fixture: ComponentFixture<ClassroomResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
