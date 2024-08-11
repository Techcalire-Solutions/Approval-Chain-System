import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficationDialogeComponent } from './verfication-dialoge.component';

describe('VerficationDialogeComponent', () => {
  let component: VerficationDialogeComponent;
  let fixture: ComponentFixture<VerficationDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerficationDialogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerficationDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
