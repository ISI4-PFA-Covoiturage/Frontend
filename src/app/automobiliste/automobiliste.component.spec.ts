import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobilisteComponent } from './automobiliste.component';

describe('AutomobilisteComponent', () => {
  let component: AutomobilisteComponent;
  let fixture: ComponentFixture<AutomobilisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomobilisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobilisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
