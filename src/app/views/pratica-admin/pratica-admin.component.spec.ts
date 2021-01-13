import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticaAdminComponent } from './pratica-admin.component';

describe('PraticaAdminComponent', () => {
  let component: PraticaAdminComponent;
  let fixture: ComponentFixture<PraticaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
