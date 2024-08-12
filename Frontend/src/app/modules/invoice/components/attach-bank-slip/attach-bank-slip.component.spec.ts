import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachBankSlipComponent } from './attach-bank-slip.component';

describe('AttachBankSlipComponent', () => {
  let component: AttachBankSlipComponent;
  let fixture: ComponentFixture<AttachBankSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachBankSlipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachBankSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
