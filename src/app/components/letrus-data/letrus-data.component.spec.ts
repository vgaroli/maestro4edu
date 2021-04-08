import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetrusDataComponent } from './letrus-data.component';

describe('LetrusDataComponent', () => {
  let component: LetrusDataComponent;
  let fixture: ComponentFixture<LetrusDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetrusDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetrusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
