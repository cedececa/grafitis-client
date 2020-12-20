import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinModalComponent } from './loading-spin-modal.component';

describe('LoadingSpinModalComponent', () => {
  let component: LoadingSpinModalComponent;
  let fixture: ComponentFixture<LoadingSpinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSpinModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
