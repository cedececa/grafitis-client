import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGrafitisComponent } from './create-grafitis.component';

describe('CreateGrafitisComponent', () => {
  let component: CreateGrafitisComponent;
  let fixture: ComponentFixture<CreateGrafitisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGrafitisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGrafitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
