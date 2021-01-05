import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoItemComponent } from './opcao-item.component';

describe('OpcaoItemComponent', () => {
  let component: OpcaoItemComponent;
  let fixture: ComponentFixture<OpcaoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcaoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
