import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVAComponent } from './choose-v-a.component';

describe('ChooseVAComponent', () => {
  let component: ChooseVAComponent;
  let fixture: ComponentFixture<ChooseVAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseVAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
