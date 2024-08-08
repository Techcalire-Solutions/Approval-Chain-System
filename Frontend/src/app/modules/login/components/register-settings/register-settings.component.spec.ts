import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSettingsComponent } from './register-settings.component';

describe('RegisterSettingsComponent', () => {
  let component: RegisterSettingsComponent;
  let fixture: ComponentFixture<RegisterSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
