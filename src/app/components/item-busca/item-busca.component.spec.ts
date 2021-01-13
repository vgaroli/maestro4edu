import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBuscaComponent } from './item-busca.component';

describe('ItemBuscaComponent', () => {
  let component: ItemBuscaComponent;
  let fixture: ComponentFixture<ItemBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBuscaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
