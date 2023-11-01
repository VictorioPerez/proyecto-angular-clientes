import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTuneroComponent } from './lista-tunero.component';

describe('ListaTuneroComponent', () => {
  let component: ListaTuneroComponent;
  let fixture: ComponentFixture<ListaTuneroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTuneroComponent]
    });
    fixture = TestBed.createComponent(ListaTuneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
