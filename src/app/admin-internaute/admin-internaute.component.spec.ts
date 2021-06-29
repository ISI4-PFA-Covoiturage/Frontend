import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternauteComponent } from './admin-internaute.component';

describe('AdminInternauteComponent', () => {
  let component: AdminInternauteComponent;
  let fixture: ComponentFixture<AdminInternauteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInternauteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
