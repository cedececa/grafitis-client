import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisGrafitisComponent } from './mis-grafitis.component';

describe('MisGrafitisComponent', () => {
  let component: MisGrafitisComponent;
  let fixture: ComponentFixture<MisGrafitisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisGrafitisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisGrafitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
