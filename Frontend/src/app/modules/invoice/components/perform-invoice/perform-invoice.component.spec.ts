import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformInvoiceComponent } from './perform-invoice.component';

describe('PerformInvoiceComponent', () => {
  let component: PerformInvoiceComponent;
  let fixture: ComponentFixture<PerformInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
