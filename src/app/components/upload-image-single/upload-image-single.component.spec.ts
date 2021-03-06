import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageSingleComponent } from './upload-image-single.component';

describe('UploadImageSingleComponent', () => {
  let component: UploadImageSingleComponent;
  let fixture: ComponentFixture<UploadImageSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImageSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
