import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoAdminComponent } from './avaliacao-admin.component';

describe('AvaliacaoAdminComponent', () => {
  let component: AvaliacaoAdminComponent;
  let fixture: ComponentFixture<AvaliacaoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
