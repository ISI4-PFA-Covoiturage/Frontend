import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnonceComponent } from './admin-annonce.component';

describe('AdminAnnonceComponent', () => {
  let component: AdminAnnonceComponent;
  let fixture: ComponentFixture<AdminAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnnonceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
