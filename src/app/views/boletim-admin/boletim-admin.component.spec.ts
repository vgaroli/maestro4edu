import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletimAdminComponent } from './boletim-admin.component';

describe('BoletimAdminComponent', () => {
  let component: BoletimAdminComponent;
  let fixture: ComponentFixture<BoletimAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoletimAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletimAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
