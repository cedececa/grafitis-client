import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafitisDetailComponent } from './grafitis-detail.component';

describe('GrafitisDetailComponent', () => {
  let component: GrafitisDetailComponent;
  let fixture: ComponentFixture<GrafitisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafitisDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafitisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
